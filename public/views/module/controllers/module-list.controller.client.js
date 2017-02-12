(function () {
    angular
        .module('SpeakApp')
        .controller('ModuleListController', ModuleListController);
    
    function ModuleListController(ModuleService) {
        var vm = this;

        function init() {
            ModuleService
                .findAllModules()
                .success(function (modules) {
                    vm.modules = modules;
                })
        }
        init();
    }
})();