(function () {
    angular
        .module('SpeakApp')
        .controller('ModuleTeachController', ModuleTeachController);
    
    function ModuleTeachController($rootScope, ModuleService) {
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