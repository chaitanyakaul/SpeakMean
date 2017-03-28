(function () {
    angular.module("SpeakApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/search', {
                    templateUrl: 'views/search/templates/search.view.client.html',
                    controller: 'SearchController',
                    controllerAs: 'model'
                })
                .when('/search-results', {
                    templateUrl: 'views/search/templates/search-results.view.client.html',
                    controller: 'SearchResultsController',
                    controllerAs: 'model'
                })
        });
})();

