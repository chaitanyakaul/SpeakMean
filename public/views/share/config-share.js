(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/share/:sessionId', {
                    templateUrl: 'views/share/templates/share.view.client.html',
                    controller: 'ShareController',
                    controllerAs: 'model'
                })
        });
})();

