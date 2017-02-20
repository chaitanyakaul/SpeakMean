(function () {
    angular
        .module('SpeakApp')
        .config(ModuleConfiguration);

    function ModuleConfiguration($routeProvider) {
        $routeProvider
            .when('/module', {
                templateUrl: 'views/module/templates/module-list.view.client.html',
                controller: 'ModuleListController',
                controllerAs: 'model'
            })
            .when('/module/teach', {
                templateUrl: 'views/module/templates/module-teach.view.client.html',
                controller: 'ModuleTeachController',
                controllerAs: 'model'
            })
            .when('/module/learn', {
                templateUrl: 'views/module/templates/module-learn.view.client.html',
                controller: 'ModuleLearnController',
                controllerAs: 'model'
            })
            .when('/module/:moduleId', {
                templateUrl: 'views/module/templates/module-edit.view.client.html',
                controller: 'ModuleEditController',
                controllerAs: 'model'
            })
    }
})();