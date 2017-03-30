/**
 * Created by niharikasharma on 3/29/17.
 */
(function () {
    angular
        .module('SpeakApp')
        .controller('AdminModuleLearnController', AdminModuleLearnController);

    function AdminModuleLearnController($location, $routeParams, ModuleService, UserService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.toggleModuleSelection = toggleModuleSelection;
        vm.selectModules = selectModules;

        function init() {
            ModuleService
                .findAllModules()
                .success(function (modules) {
                    // console.log(modules);
                    vm.modules = modules;
                })

            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    // console.log(user);
                    vm.user = user;
                })
        }
        init();



        function toggleModuleSelection(module) {
            // if not teaching module already, then add it to the list
            if(vm.user.modules.learning.indexOf(module.name) == -1) {
                vm.user.modules.learning.push(module.name);
            }
            else {
                var index = vm.user.modules.learning.indexOf(module.name);
                if(index >= 0) {
                    vm.user.modules.learning.splice(index, 1);
                }
            }
            // console.log(vm.user.modules.learning);
            // console.log(vm.user);
        }

        function selectModules(userId, user) {

            UserService
                .updateUser(userId, user)
                .success(function(status) {
                    $location.url("/admin/user/" + vm.userId);
                });
        }
    }
})();
