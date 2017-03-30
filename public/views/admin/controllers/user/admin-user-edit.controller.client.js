(function () {
    angular
        .module("SpeakApp")
        .controller("AdminUserEditController", AdminUserEditController);

    function AdminUserEditController(UserService, $routeParams, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.userId = $routeParams.userId;
        // console.log(vm.userId);

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(renderUser);
        }
        init();

        vm.toggleLearnerRole = toggleLearnerRole;
        vm.toggleCoachRole = toggleCoachRole;

        function toggleLearnerRole(role) {
            // if not role already, then add it to the list
            if(vm.user.roles.indexOf(role) == -1) {
                vm.user.roles.push(role);
            }
            else {
                var index = vm.user.roles.indexOf(role);
                if(index >= 0) {
                    vm.user.roles.splice(index, 1);
                }
            }
            console.log(vm.user.roles);
        }

        function toggleCoachRole(role) {
            // if not role already, then add it to the list
            if(vm.user.roles.indexOf(role) == -1) {
                vm.user.roles.push(role);
            }
            else {
                var index = vm.user.roles.indexOf(role);
                if(index >= 0) {
                    vm.user.roles.splice(index, 1);
                }
            }
        }

        function updateUser(userId, user) {

            UserService
                .updateUser(userId, user)
                .success(function(status) {
                    vm.message = 'User updated successfully';
                });
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