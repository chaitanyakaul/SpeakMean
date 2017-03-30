(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/admin', {
                    templateUrl: 'views/admin/templates/admin.view.client.html',
                    controller: 'AdminController'
                })
                .when('/admin/user', {
                    templateUrl: 'views/admin/templates/user/admin-user-list.view.client.html',
                    controller: 'AdminUserListController',
                    controllerAs: 'model'
                })

                .when('/admin/user/new', {
                    templateUrl: 'views/admin/templates/user/admin-user-new.view.client.html',
                    controller: 'AdminUserNewController',
                    controllerAs: 'model'
                })

                .when('/admin/user/:userId', {
                    templateUrl: 'views/admin/templates/user/admin-user-edit.view.client.html',
                    controller: 'AdminUserEditController',
                    controllerAs: 'model'
                })
                .when('/admin/user/:userId/language/learn', {
                    templateUrl: 'views/admin/templates/user/language/admin-language-learn.view.client.html',
                    controller: 'AdminLanguageLearnController',
                    controllerAs: 'model'
                })
                .when('/admin/user/:userId/language/teach', {
                    templateUrl: 'views/admin/templates/user/language/admin-language-teach.view.client.html',
                    controller: 'AdminLanguageTeachController',
                    controllerAs: 'model'
                })
                .when('/admin/user/:userId/module/learn', {
                    templateUrl: 'views/admin/templates/user/module/admin-module-learn.view.client.html',
                    controller: 'AdminModuleLearnController',
                    controllerAs: 'model'
                })
                .when('/admin/user/:userId/module/teach', {
                    templateUrl: 'views/admin/templates/user/module/admin-module-teach.view.client.html',
                    controller: 'AdminModuleTeachController',
                    controllerAs: 'model'
                })
                // languages
                .when('/admin/language', {
                    templateUrl: 'views/admin/templates/language/admin-language-list.view.client.html'
                })
                .when('/admin/language/:languageId', {
                    templateUrl: 'views/admin/templates/language/admin-language-edit.view.client.html'
                })
                // countries
                .when('/admin/country', {
                    templateUrl: 'views/admin/templates/country/admin-country-list.view.client.html'
                })
                .when('/admin/country/:countryId', {
                    templateUrl: 'views/admin/templates/country/admin-country-edit.view.client.html'
                })
        });
})();