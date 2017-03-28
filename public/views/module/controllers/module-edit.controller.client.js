(function () {
    angular
        .module('SpeakApp')
        .controller('ModuleEditController', ModuleEditController);
    
    function ModuleEditController(ModuleService, $routeParams, $location) {
        var vm = this;
        vm.moduleId = $routeParams.moduleId;

        vm.createModule = createModule;
        vm.updateModule = updateModule;

        vm.addVocabulary = addVocabulary;
        vm.removeVocabulary = removeVocabulary;

        vm.addTopic = addTopic;
        vm.removeTopic = removeTopic;
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

        function createModule() {
            ModuleService
                .createModule(vm.module)
                .success(function() {
                    $location.url('/module')
                });
        }

        function updateModule() {
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .success(function() {
                    $location.url('/module')
                });
        }

        function addTopic(topic){
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
    }
})();