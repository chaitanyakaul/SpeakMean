(function () {
    angular
        .module('SpeakApp')
        .config(LanguageConfiguration);

    function LanguageConfiguration($routeProvider) {
        $routeProvider
            .when('/language', {
                templateUrl: 'views/language/templates/language-list.view.client.html',
                controller: 'LanguageListController',
                controllerAs: 'model'
            })
            .when('/language/teach', {
                templateUrl: 'views/language/templates/language-teach.view.client.html',
                controller: 'LanguageTeachController',
                controllerAs: 'model'
            })
            .when('/language/learn', {
                templateUrl: 'views/language/templates/language-learn.view.client.html',
                controller: 'LanguageLearnController',
                controllerAs: 'model'
            })
            .when('/language/:languageId', {
                templateUrl: 'views/language/templates/language-edit.view.client.html',
                controller: 'LanguageEditController',
                controllerAs: 'model'
            })
            .when('/language/new', {
                templateUrl: 'views/language/templates/language-new.view.client.html',
                controller: 'LanguageNewController',
                controllerAs: 'model'
            })
    }
})();