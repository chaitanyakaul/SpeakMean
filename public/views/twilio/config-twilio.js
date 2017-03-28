(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/twilio/:userId/:language/:module', {
                    templateUrl: 'views/twilio/twilio.view.client.html',
                    controller: 'TwilioController',
                    controllerAs: 'model'
                })
                .when('/twilio/:userId', {
                    templateUrl: 'views/twilio/twilio.view.client.html',
                    controller: 'TwilioController',
                    controllerAs: 'model'
                })
        });
})();

