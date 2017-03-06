(function () {
    angular
        .module('SpeakApp')
        .controller('ModuleLearnController', ModuleLearnController);
    
    function ModuleLearnController(ModuleService) {
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