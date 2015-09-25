"use strict";

var tutorialsApp = angular.module('tutorialsApp', ['ngSanitize', 'LocalStorageModule', 'ui.ace']);

tutorialsApp.controller('MainCtrl', ['$scope', '$http', '$sce', '$location', 'localStorageService', 'sharedData',
    function ($scope, $http, $sce, $location, localStorageService, sharedData) {

        $scope.sharedData = sharedData;

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
                var issues = [];

                response.data.forEach(function(issue){
                    var is_enhancement = false;
                    issue.labels.forEach(function(label){
                        if(label.name === "enhancement"){
                            is_enhancement = true;
                        }
                    });
                    if(!is_enhancement){
                        issues.push(issue);
                    }
                });
                $scope.issues = issues;
            });

        $scope.tutorials = [];
        $http.get('https://api.github.com/repos/esri-es/JavascriptAPI/contents/src/tutoriales').
            then(function (response) {
                response.data.forEach(function (elem) {
                    if (elem.name.indexOf(".html") !== -1) {
                        $http.get("./" + elem.path).
                            then(function (html) {
                                var name = $scope.getTitle(html.data);
                                var description = $scope.getDescription(html.data);
                                if(name){
                                $scope.tutorials.push({
                                    name: name,
                                    description: description,
                                    path: elem.path,
                                    url: elem.html_url,
                                    o: parseInt(name.substr(8,name.indexOf(":")-8)),
                                    i: $scope.tutorials.length
                                });
                                }
                            });
                    }
                });

                $scope.init = function () {

                };

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

        $scope.update = function (j) {
            $scope.trigger = false;

            if(typeof j !== "undefined"){
                $scope.tuto = j;
            }
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
            $scope.description = elem.description;
            $scope.tutoTitle = elem.name;
            $scope.html_url = elem.url;
            $scope.url = elem.path;


            $http.get("./" + $scope.url).
                then(function (response) {
                    $scope.source = $scope.htmlCode = response.data;
                });
        };

        $scope.addToFavourites = function(){
            if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
                window.sidebar.addPanel(document.title,window.location.href,'');
            } else if(window.external && ('AddFavorite' in window.external)) { // IE Favorite
                window.external.AddFavorite(location.href,document.title);
            } else if(window.opera && window.print) { // Opera Hotlist
                this.title=document.title;
                return true;
            } else { // webkit - safari/chrome
                alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
            }
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
        };

        $scope.getDescription = function (html) {

            var i, metas, el = document.createElement( 'html' );

            el.innerHTML = html.replace("<!DOCTYPE html>", "");
            metas = el.getElementsByTagName('meta');


            for (i=0; i<metas.length; i++) {
                if (metas[i].getAttribute("name") == "description") {
                    return metas[i].getAttribute("content");
                }
            }

             return "";
        };

        $scope.deactivate = function(){
            $scope.trigger = false;
        }

        // Init iframe
        $scope.trigger = false;

        // Editor
        $scope.activate = function(){

            $scope.trigger = true;
            $scope.sendCode();
        }

        $scope.sendCode = function(){
            $scope.trigger = true;
            document.getElementById("jsfiddle").remove();
            var iframe = document.createElement( 'iframe' );
            iframe.src="jsfiddle.html";
            iframe.id="jsfiddle";
            iframe.style.height="684px";
            document.getElementById("iframeContainer").appendChild(iframe);
            setTimeout(function(){
            $scope.sharedData.send({
                source: btoa($scope.source)
            });
            },500);
        };
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
});

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

tutorialsApp.directive('postRepeatInit', function() {
    return function(scope, element, attrs) {
        if (scope.$last) {

        }
    };
});

tutorialsApp.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    //scope.$emit('ngRepeatFinished');
                    var selected = window.location.hash;
                    if (selected.indexOf("#/") !== -1) {
                        selected = parseInt(selected.substr(2));
                    }

                    var i;
                    scope.tutorials.forEach(function (elem) {
                        if (elem.o === selected) {
                            i = elem.i;
                            return 0;
                        }
                    });

                    if (selected) {
                        scope.update(i);
                    } else {
                        scope.update(0);
                        console.log("Mostramos 0")
                    }
                });
            }
        }
    }
});

tutorialsApp.factory('sharedData', function(){
    var mainScope;
    var iframeScope;
    var data = {};

    function update(){

        if(!mainScope){
            mainScope = angular.element(document.body).scope();
        }
        mainScope.$applyAsync();

        if(document.getElementById('jsfiddle').contentWindow.angular){
            iframeScope = document.getElementById('jsfiddle').contentWindow.angular.element(document.body).scope();

            iframeScope.trigger = mainScope.trigger;
            iframeScope.data = data;
            iframeScope.$applyAsync();
        }

    }

    return {
        send: function(values) {
            data = values;
            update();
        },
        getTrigger: function() {
            return angular.element(document.body).scope().trigger
        },
        getData: function() {
            return angular.element(document.body).scope().data
        }
    }
});

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}