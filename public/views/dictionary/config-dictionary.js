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
            .when('/dictionary/new',{
                templateUrl: 'views/dictionary/templates/dictionary-new.view.client.html',
                controller: 'DictionaryNewController',
                controllerAs: 'model'
            })

            .when('/dictionary/:dictionaryId', {
                templateUrl: 'views/dictionary/templates/dictionary-edit.view.client.html',
                controller: 'DictionaryEditController',
                controllerAs: 'model'
            })


    }
})();