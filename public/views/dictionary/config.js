(function () {
    angular
        .module('SpeakApp')
        .config(DictionaryConfiguration);

    function DictionaryConfiguration($routeProvider) {
        $routeProvider
            .when('/dictionary', {
                templateUrl: 'views/dictionary/templates/dictionary-list.view.client.html',
                controller: 'DictionaryListController',
                controllerAs: 'model'
            })
            .when('/dictionary/:moduleId', {
                templateUrl: 'views/module/templates/dictionary-edit.view.client.html',
                controller: 'DictionaryEditController',
                controllerAs: 'model'
            })
    }
})();