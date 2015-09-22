"use strict";

var tutorialsApp = angular.module('tutorialsApp', ['ngSanitize']);

tutorialsApp.controller('MainCtrl', ['$scope', '$http', '$sce',
    function ($scope, $http, $sce) {


        $http.get('https://api.github.com/repos/esri-es/JavascriptAPI/issues',
            {headers: {"Authorization": "token b751cfeb0f636c9474739f7da2f07a3936d0eec3"}}).
            then(function (response) {
                $scope.issues = response.data;
            });

        $http.get('https://api.github.com/repos/esri-es/JavascriptAPI/contents/src/tutoriales',
            {headers: {"Authorization": "token b751cfeb0f636c9474739f7da2f07a3936d0eec3"}}).
            then(function (response) {
                $scope.tutorials = [];
                response.data.forEach(function (elem) {
                    if (elem.name.indexOf(".html") !== -1) {
                        $http.get("./" + elem.path).
                            then(function (html) {
                                var name = $scope.getTitle(html.data);
                                $scope.tutorials.push({
                                    name: name,
                                    path: elem.path,
                                    url: elem.html_url,
                                    i: $scope.tutorials.length
                                })
                            });
                    }
                });

                setTimeout(function () {
                    var selected = window.location.hash.substr(1);
                    if (selected) {
                        $scope.tuto = parseInt(selected) - 1;
                    } else {
                        $scope.tuto = 0;
                    }

                    $scope.update();
                }, 1000)

            });

        $scope.update = function () {
            var elem = $scope.tutorials[$scope.tuto];
            $scope.html_url = elem.url;
            $scope.url = elem.path;


            $http.get("./" + $scope.url,
                {headers: {"Authorization": "token b751cfeb0f636c9474739f7da2f07a3936d0eec3"}}).
                then(function (response) {
                    $scope.htmlCode = response.data;

                });
        };

        $scope.getTitle = function (html) {
            return (html.replace(/<!\[CDATA\[(.+?)\]\]>/g
                , function (_match, body) {
                    return body.replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                })
                .replace(/<!--.+?-->/g, '')
                .match(/<title>.+?<\/title>/ig) || [])
                .map(function (t) {
                    return t.substring(7, t.length - 8)
                })
                .join(' ')
        }

    }
]);

tutorialsApp.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

tutorialsApp.filter('pretty', function () {
    return function (text) {
        return PR.prettyPrintOne(text);
    }
})

tutorialsApp.filter('escapeHtml', function () {

    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    return function (str) {
        return String(str).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }
});