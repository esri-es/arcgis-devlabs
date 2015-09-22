"use strict";

var tutorialsApp = angular.module('tutorialsApp', ['ngSanitize', 'LocalStorageModule']);

tutorialsApp.controller('MainCtrl', ['$scope', '$http', '$sce', '$location', 'localStorageService',
    function ($scope, $http, $sce, $location, localStorageService) {

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        $scope.access_token = getParameterByName("access_token");
        if($scope.access_token){
            localStorageService.set('access_token', $scope.access_token);
            window.location.search = '';
        }

        $scope.access_token = localStorageService.get('access_token');

        if($scope.access_token){
            $http.defaults.headers.common.Authorization = 'token ' + $scope.access_token;
        }

        $http.get('https://api.github.com/repos/esri-es/JavascriptAPI/issues').
            then(function (response) {
                $scope.issues = response.data;
            });

        $http.get('https://api.github.com/repos/esri-es/JavascriptAPI/contents/src/tutoriales').
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
                                    o: parseInt(name.substr(8,name.indexOf(":")-8)),
                                    i: $scope.tutorials.length
                                })
                            });
                    }
                });

                setTimeout(function () {
                    var selected = window.location.hash;
                    if(selected.indexOf("#/") !== -1){
                        selected = parseInt(selected.substr(2));
                    }

                    var i;
                    $scope.tutorials.forEach(function(elem){
                        if(elem.o === selected){
                            i = elem.i;
                            return 0;
                        }
                    });

                    if (selected) {
                        $scope.tuto = i;
                    } else {
                        $scope.tuto = 0;
                    }

                    $scope.update();
                }, 1000)

            });

        $scope.submit = function(){
            if($scope.question){
                $http.post('https://api.github.com/repos/esri-es/JavascriptAPI/issues',
                    {
                        "title": $scope.tutoTitle,
                        "body": $scope.question
                    }).then(function(response) {
                        if(response.statusText === "Created"){
                            $scope.issues.push(response.data);
                        }
                });
            }else{
                alert("Introduce tu pregunta antes de enviar");
            }
        };

        $scope.close = function(){
            localStorageService.set('access_token', '');
            delete $scope.access_token;
        };

        $scope.update = function () {
            var i = -1, elem;
            $scope.tutorials.forEach(function(elem){
                if(elem.i === parseInt($scope.tuto)){
                    i = elem.i;
                    return 0;
                }
            });
            if(i === -1)
                return -1;
            elem = $scope.tutorials[i];
            $scope.tuto = i;
            $scope.tutoTitle = elem.name;
            $scope.html_url = elem.url;
            $scope.url = elem.path;


            $http.get("./" + $scope.url).
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

tutorialsApp.filter('num', function() {
    return function(input) {
        return parseInt(input, 10);
    };
});

tutorialsApp.filter('customSort',function(){
    var sort = function (a, b) {
        if (a > b) { return 1; }
        if (a < b) { return -1; }

        return 0;
    };

    return function(arrInput, prop) {
        var arr = arrInput.sort(function(a, b) {
            return sort(+a[prop], +b[prop]);
        });
        return arr;
    }
});