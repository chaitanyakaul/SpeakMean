(function () {
    angular
        .module("SpeakApp")
        .controller("AdminUserNewController", AdminUserNewController);

    function AdminUserNewController(UserService, $routeParams, $location, $rootScope) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {
            UserService
                .createUser(user)
                .success(returnToAdminUserList);
        }

        function returnToAdminUserList() {
            $location.url('/admin/user');
        }

        function renderUser(user) {
            vm.user = user;
        }
    }
})();