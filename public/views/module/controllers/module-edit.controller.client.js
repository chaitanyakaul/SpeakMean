(function () {
    angular
        .module('SpeakApp')
        .controller('ModuleEditController', ModuleEditController);
    
    function ModuleEditController(ModuleService, $routeParams) {
        var vm = this;
        vm.moduleId = $routeParams.moduleId;
        vm.updateModule = updateModule;

        function init() {
            ModuleService
                .findAllModules()
                .success(function (modules) {
                    vm.modules = modules;
                });
            if(vm.moduleId != 'new') {
                ModuleService
                    .findModuleById(vm.moduleId)
                    .success(function (module) {
                        vm.module = module;
                    });
            }
        }
        init();

        function updateModule(module) {
            // TODO: updates the module's info such as module name
        }
    }
})();