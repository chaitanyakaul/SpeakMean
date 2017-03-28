(function () {
    angular
        .module("SpeakApp")
        .controller("SearchResultsController", SearchResultsController);
    
    function SearchResultsController($location, UserService) {
        var vm = this;

        var query = $location.search();
        vm.language = query.language;

        function init() {
            var criteria = {
                language: vm.language
            };
            UserService
                .findUsersByCriteria(criteria)
                .success(function (users) {
                    vm.results = users;
                });
        }
        init();
    }
})();