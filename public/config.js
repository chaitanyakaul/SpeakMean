(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home/home.view.html',
                    controller: 'HomeController'
                    // resolve: {
                    //     loggedin: checkCurrentUser
                    // }
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
                .when('/feedback', {
                    templateUrl: 'views/feedback/templates/feedback.view.html',
                    controller: 'FeedbackCtrl',
                    controllerAs: 'model'
                })
                .otherwise({
                    redirectTo: '/session'
                });
        });

    // var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
    //     var deferred = $q.defer();
    //
    //     $http.get('/api/loggedin').success(function (user) {
    //         $rootScope.errorMessage = null;
    //         // User is Authenticated
    //         if (user !== '0' && user.roles.indexOf('admin') != -1) {
    //             $rootScope.currentUser = user;
    //             deferred.resolve();
    //         }
    //     });
    //
    //     return deferred.promise;
    // };
    //
    //
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
    //
    // var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
    //     var deferred = $q.defer();
    //
    //     $http.get('/api/loggedin').success(function (user) {
    //         $rootScope.errorMessage = null;
    //         // User is Authenticated
    //         if (user !== '0') {
    //             $rootScope.currentUser = user;
    //         }
    //         deferred.resolve();
    //     });
    //     return deferred.promise;
    // };
})();

