(function () {
    angular
        .module('SpeakApp')
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when('/transcript/:transcriptId', {
                templateUrl: 'views/transcript/transcript.view.client.html',
                controller: 'TranscriptController',
                controllerAs: 'model'
            });
    }
})();