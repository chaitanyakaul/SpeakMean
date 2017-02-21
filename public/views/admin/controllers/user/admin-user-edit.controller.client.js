(function () {
    angular
        .module("SpeakApp")
        .controller("AdminUserEditController", AdminUserEditController);

    function AdminUserEditController(UserService, $routeParams) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.createUser = createUser;
        vm.userId = $routeParams.userId;

        function init() {
            // UserService
            //     .findUserById(vm.userId)
            //     .success(renderUser);
        }
        init();

        function updateUser(userId, user) {
            UserService
                .updateUser(userId, user)
                .success(returnToAdminUserList);
        }

        function createUser(user) {
            UserService
                .createUser(user)
                .success(returnToAdminUserList);
        }

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
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