(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/feedback/:sessionId', {
                    templateUrl: 'views/feedback/templates/feedback.view.html',
                    controller: 'FeedbackCtrl',
                    controllerAs: 'model'
                })
        });
})();

