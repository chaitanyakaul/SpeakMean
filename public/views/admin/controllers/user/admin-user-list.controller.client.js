(function () {
    angular
        .module("SpeakApp")
        .controller("AdminUserListController", AdminUserListController);

    function AdminUserListController(UserService) {
        var vm = this;

        function init() {
            UserService
                .findAllUsers()
                .success(renderAllUsers);
        }
        init();

        function renderAllUsers(users) {
            vm.users = users;
        }
    }
})();