(function () {
    angular
        .module("SpeakApp")
        .controller("SearchResultsController", SearchResultsController);
    
    function SearchResultsController($location, UserService, $routeParams) {
        var vm = this;

        vm.language = $routeParams.language;
        vm.moduleId = $routeParams.moduleId;

        function init() {
            var criteria = {
                language: vm.language,
                moduleId: vm.moduleId
            };
            UserService
                .findUsersByCriteria(criteria)
                .success(function (users) {
                    $location.url('/twilio/'+users[0]._id+'/'+vm.language+'/'+vm.moduleId);
                    // vm.results = users;
                });
        }
        init();
    }
})();