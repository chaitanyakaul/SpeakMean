(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/profile', {
                    templateUrl: 'views/user/templates/profile.view.html',
                    controller: 'ProfileCtrl',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/login', {
                    templateUrl: 'views/user/templates/login.view.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'model'
                })
                .when('/register', {
                    templateUrl: 'views/user/templates/register.view.html',
                    controller: 'RegisterCtrl',
                    controllerAs: 'model'
                })
                .when('/feedback', {
                    templateUrl: 'views/user/templates/feedback.view.html',
                    controller: 'FeedbackCtrl',
                    controllerAs: 'model'
                })
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
                // $location.url('/profile/'+user._id);
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

