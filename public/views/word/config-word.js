(function () {
    angular
        .module('SpeakApp')
        .config(WordConfiguration);

    function WordConfiguration($routeProvider) {
        $routeProvider
            .when('/dictionary/:dictionaryId/word', {
                templateUrl: 'views/word/templates/word-list.view.client.html',
                controller: 'WordListController',
                controllerAs: 'model'
            })
            .when('/dictionary/:dictionaryId/word/new', {
                templateUrl: 'views/word/templates/word-new.view.client.html',
                controller: 'WordNewController',
                controllerAs: 'model'
            })

            .when('/word/:wordId/edit', {
                templateUrl: 'views/word/templates/word-edit.view.client.html',
                controller: 'WordEditController',
                controllerAs: 'model'
            })

            .when('/word/:wordId', {
                templateUrl: 'views/word/templates/word-edit.view.client.html',
                controller: 'WordListController',
                controllerAs: 'model'
            })
    }
})();