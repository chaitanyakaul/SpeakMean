(function () {
    angular
        .module('SpeakApp')
        .controller('ModuleEditController', ModuleEditController);
    
    function ModuleEditController(ModuleService, $routeParams) {
        var vm = this;
        vm.moduleId = $routeParams.moduleId;
        vm.updateModule = updateModule;
        vm.addVocabulary = addVocabulary;
        vm.removeVocabulary = removeVocabulary;

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

        function updateModule() {
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .success(function() {

                });
        }

        function addVocabulary(vocabulary) {
            vm.module.vocabulary.push(vocabulary);
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .success(function() {

                });
        }

        function removeVocabulary(vocabulary) {
            var index = vm.module.vocabulary.indexOf(vocabulary)
            vm.module.vocabulary.splice(index,1);
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .success(function () {

                });
        }

    }
})();