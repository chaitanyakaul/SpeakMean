(function () {
    angular
        .module('SpeakApp')
        .controller('GrammarEditController', GrammarEditController);
    
    function GrammarEditController(ModuleService, $routeParams, $location) {

        var vm = this;
        vm.moduleId = $routeParams.moduleId;
        vm.grammarIndex = $routeParams.grammarIndex;

        vm.saveGrammar = saveGrammar;
        vm.deleteGrammar = deleteGrammar;

        function init() {
            ModuleService
                .findModuleById(vm.moduleId)
                .success(function (module) {
                    vm.module = module[0];
                    if(vm.grammarIndex != 'new') {
                        vm.grammar = vm.module.grammar[vm.grammarIndex];
                    }
                });
        }
        init();

        function saveGrammar(grammar) {
            if(vm.grammarIndex === 'new') {
                vm.module.grammar.push(grammar);
            } else {
                vm.module.grammar[vm.grammarIndex] = grammar;
            }
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .then(function (response) {
                    $location.url('/module/' + vm.moduleId);
                });
        }
        
        function deleteGrammar(index) {
            if(vm.grammarIndex !== 'new') {
                vm.module.grammar.splice(index, 1);
                ModuleService
                    .updateModule(vm.moduleId, vm.module)
                    .then(function (response) {
                        $location.url('/module/' + vm.moduleId);
                    });
            }
        }
    }
})();