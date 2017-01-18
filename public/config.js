(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home/home.view.html',
                    controller: 'HomeController',
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when('/activity', {
                    templateUrl: 'views/activity/activity-list.view.client.html',
                    controller: 'ActivityController',
                    controllerAs: 'model'
                })
                .when('/search', {
                    templateUrl: 'views/search/search.view.client.html',
                    controller: 'SearchController',
                    controllerAs: 'model'
                })
                .when('/search-results', {
                    templateUrl: 'views/search/search-results.view.client.html',
                    controller: 'SearchResultsController',
                    controllerAs: 'model'
                })
                .when('/profile', {
                    templateUrl: 'views/profile/profile.view.html',
                    controller: 'ProfileCtrl',
                    // resolve: {
                    //     loggedin: checkLoggedin
                    // }
                })
                .when('/contact', {
                    templateUrl: 'views/contact/contact.view.html',
                    controller: 'ContactCtrl'
                })
                .when('/admin', {
                    templateUrl: 'views/admin/admin.view.html',
                    controller: 'AdminController',
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when('/login', {
                    templateUrl: 'views/login/login.view.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'model'
                })
                .when('/register', {
                    templateUrl: 'views/register/register.view.html',
                    controller: 'RegisterCtrl',
                    controllerAs: 'model'
                })
                .otherwise({
                    redirectTo: '/activity'
                });
        });

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.currentUser = user;
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
                $rootScope.currentUser = user;
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
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


})();

