(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            // alert($);
            var configFiles = [
                'views/twilio/config-twilio.json',
                'views/user/config-user.json',
                'views/transcript/config-transcript.json',
                'views/module/config-module.json',
                'views/search/config-search.json',
                'views/share/config-share.json',
                'views/feedback/config-feedback.json',
                'views/dictionary/config-dictionary.json',
                'views/admin/config-admin.json',
                'views/language/config-language.json',
                'views/word/config-word.json'
            ];
            configFiles.forEach(function (configFile) {
                $.ajax(configFile, {
                    async: false,
                    success:
                        function (data) {
                            // console.log(data);
                            data.forEach(function (routeObj) {
                                // console.log(route);
                                // console.log(Object.keys(route));
                                var route = Object.keys(routeObj)[0];
                                var routeConfig = routeObj[route];
                                console.log([route, routeConfig]);
                                if (routeConfig.resolve) {
                                    if (routeConfig.resolve.user === 'checkCurrentUser') {
                                        routeConfig.resolve.user = checkCurrentUser;
                                    } else if (routeConfig.resolve.user === 'checkAdmin') {
                                        routeConfig.resolve.user = checkAdmin;
                                    } else if (routeConfig.resolve.user === 'checkLoggedin') {
                                        routeConfig.resolve.user = checkLoggedin;
                                    }
                                } else {
                                    routeConfig.resolve = {
                                        user: checkCurrentUser
                                    };
                                }
                                $routeProvider
                                    .when(route, routeConfig);
                            });
                        }
                });
            });
            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home/home.view.html',
                    controller: 'HomeController'
                    // resolve: {
                    //     loggedin: checkCurrentUser
                    // }
                })
                .when('/dictapi', {
                    templateUrl: 'views/dictionary-api/dictionary-api.view.client.html',
                    controller: 'DictionaryApiController',
                    controllerAs: 'model'
                })
                .when('/session', {
                    templateUrl: 'views/session/templates/session-list.view.client.html',
                    controller: 'SessionController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/activity', {
                    templateUrl: 'views/activity/activity-list.view.client.html',
                    controller: 'ActivityController',
                    controllerAs: 'model'
                    // resolve: {
                    //     loggedin: checkLoggedin
                    // }
                })
                .when('/translate', {
                    templateUrl: 'views/translate/translation.html',
                    controller: 'TranslationController',
                    controllerAs: 'model'
                })
                .when('/coach/:userId', {
                    templateUrl: 'views/coach/coach.view.html',
                    controller: 'CoachCtrl',
                    controllerAs: 'model'
                })
                // .when('/feedback', {
                //     templateUrl: 'views/feedback/templates/feedback.view.html',
                //     controller: 'FeedbackCtrl',
                //     controllerAs: 'model'
                // })
                .otherwise({
                    redirectTo: '/session'
                });
        });

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.user = user;
            }
            deferred.resolve();
        });
        return deferred.promise;
    };
})();

