'use strict';
app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'JS_REQUIRES', '$controllerProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, jsRequires, $controllerProvider) {

        app.controller = $controllerProvider.register;
     

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });
        //url not found path
        $urlRouterProvider.otherwise("/app/home");

        $stateProvider.state('app', {
            url: "/app",
            templateUrl: "assets/views/app.html",
            resolve: '',
            abstract: true
        }).state('app.home', {
            url: "/home",
            templateUrl: "assets/views/home.html?",
            resolve: loadSequence('homeCtrl'),
            title: 'Home',

            }).state('app.page1', {
                url: "/page1",
                templateUrl: "assets/views/page1.html?",
                resolve: loadSequence('page1Ctrl'),
                title: 'page1',

            });


        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLL, $q) {
                        var promise = $q.when(1);
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            if (typeof _arg == 'function')
                                return promise.then(_arg);
                            else
                                return promise.then(function () {
                                    var nowLoad = requiredData(_arg);
                                    if (!nowLoad)
                                        return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                    return $ocLL.load(nowLoad);
                                });
                        }

                        function requiredData(name) {
                            if (jsRequires.modules)
                                for (var m in jsRequires.modules)
                                    if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                                        return jsRequires.modules[m];
                            return jsRequires.scripts && jsRequires.scripts[name];
                        }
                    }]
            };
        }

    }]);

