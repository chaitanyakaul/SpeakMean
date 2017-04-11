(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/twilio/:userId/:language/:module', {
                    templateUrl: 'views/twilio/twilio.view.client.html',
                    controller: 'TwilioController',
                    controllerAs: 'model',
                    resolve: {
                        user: checkCurrentUser
                    }
                })
                .when('/twilio/:userId', {
                    templateUrl: 'views/twilio/twilio.view.client.html',
                    controller: 'TwilioController',
                    controllerAs: 'model',
                    resolve: {
                        user: checkCurrentUser
                    }
                })
        });

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

