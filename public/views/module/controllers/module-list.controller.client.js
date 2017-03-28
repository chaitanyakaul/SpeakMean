(function () {
    angular
        .module('SpeakApp')
        .controller('ModuleListController', ModuleListController);
    
    function ModuleListController(ModuleService,$location,$route) {
        var vm = this;
        vm.createModule=createModule;
        vm.deleteModule=deleteModule;
        function init() {
            ModuleService
                .findAllModules()
                .success(function (modules) {
                    vm.modules = modules;
                })
        }
        init();

        function createModule(Name) {
            ModuleService
                .createModule({'name':Name})
                .success(function (module) {
                    $location.url('/module/'+module._id)
                })
        }
        
        function deleteModule(moduleId) {
            var answer = confirm('Are you sure you want to delete the Module?')
            if(answer){
                ModuleService
                    .deleteModule(moduleId)
                    .success(function (status) {
                        $route.reload();
                    })
            }
        }
    }
})();