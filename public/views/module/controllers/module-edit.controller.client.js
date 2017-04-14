(function () {
    angular
        .module('SpeakApp')
        .controller('ModuleEditController', ModuleEditController);
    
    function ModuleEditController(ModuleService, $routeParams, $location, $sce) {
        var vm = this;
        vm.moduleId = $routeParams.moduleId;

        vm.createModule = createModule;
        vm.updateModule = updateModule;
        vm.deleteModule = deleteModule;

        vm.addVocabulary = addVocabulary;
        vm.removeVocabulary = removeVocabulary;

        vm.addTopic = addTopic;
        vm.removeTopic = removeTopic;

        vm.addGrammar = addGrammar;
        vm.removeGrammar = removeGrammar;

        vm.getSecureHtml = getSecureHtml;

        vm.reorderTopicUp = reorderTopicUp;
        vm.reorderTopicDown = reorderTopicDown;

        vm.reorderGrammarUp = reorderGrammarUp;
        vm.reorderGrammarDown = reorderGrammarDown;

        // vm.routeToList=routeToList;

        function init() {
            if(vm.moduleId != 'new') {
                ModuleService
                    .findModuleById(vm.moduleId)
                    .success(function (module) {
                        vm.module = module[0];
                    });
            }
        }
        init();

        function reorderTopicUp(index) {
            if(index > 0) {
                vm.module.topics.splice(index - 1, 0, vm.module.topics.splice(index, 1)[0]);
            }
        }

        function reorderTopicDown(index) {
            if(index < vm.module.topics.length) {
                vm.module.topics.splice(index + 1, 0, vm.module.topics.splice(index, 1)[0]);
            }
        }

        function reorderGrammarUp(index) {
            if(index > 0) {
                vm.module.grammar.splice(index - 1, 0, vm.module.grammar.splice(index, 1)[0]);
            }
        }

        function reorderGrammarDown(index) {
            if(index < vm.module.grammar.length) {
                vm.module.grammar.splice(index + 1, 0, vm.module.grammar.splice(index, 1)[0]);
            }
        }

        function getSecureHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function createModule() {
            ModuleService
                .createModule(vm.module)
                .success(function() {
                    $location.url('/module');
                });
        }

        function deleteModule(moduleId) {
            var answer = confirm('Are you sure you want to delete the Module?')
            if(answer){
                ModuleService
                    .deleteModule(moduleId)
                    .success(function (status) {
                        $location.url('/module');
                    })
            }
        }

        function updateModule() {
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .success(function() {
                    $location.url('/module');
                });
        }

        function addTopic(topic){
            if(!vm.module.topics) {
                vm.module.topics = [];
            }
            vm.module.topics.push(topic);
            vm.topic = null;
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .success(function () {

                })
        }
        
        function removeTopic(topic) {
            var index = vm.module.topics.indexOf(topic)
            vm.module.topics.splice(index,1);
            ModuleService
                .updateModule(vm.moduleId,vm.module)
                .success(function () {
                    
                })
        }

        function addVocabulary(vocabulary) {
            if(!vm.module.vocabulary) {
                vm.module.vocabulary = [];
            }
            vm.module.vocabulary.push(vocabulary);
            vm.vocabulary = null;
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

        function addGrammar(grammar) {
            if(!vm.module.grammar) {
                vm.module.grammar = [];
            }
            vm.module.grammar.push(grammar);
            vm.grammar = null;
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .success(function() {

                });
        }

        function removeGrammar(grammar) {
            var index = vm.module.grammar.indexOf(grammar)
            vm.module.grammar.splice(index,1);
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .success(function () {

                });
        }
    }
})();