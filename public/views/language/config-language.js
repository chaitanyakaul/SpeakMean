(function () {
    angular
        .module('SpeakApp')
        .config(LanguageConfiguration);

    function LanguageConfiguration($routeProvider) {
        $routeProvider
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
            // .when('/module/:moduleId', {
            //     templateUrl: 'views/module/templates/module-edit.view.client.html',
            //     controller: 'ModuleEditController',
            //     controllerAs: 'model'
            // })
    }
})();