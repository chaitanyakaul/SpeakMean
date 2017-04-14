(function () {
    angular
        .module('SpeakApp')
        .controller('TopicEditController', TopicEditController);
    
    function TopicEditController(ModuleService, $routeParams, $location) {

        var vm = this;
        vm.moduleId = $routeParams.moduleId;
        vm.topicIndex = $routeParams.topicIndex;

        vm.saveTopic = saveTopic;
        vm.deleteTopic = deleteTopic;

        function init() {
            ModuleService
                .findModuleById(vm.moduleId)
                .success(function (module) {
                    vm.module = module[0];
                    if(vm.topicIndex != 'new') {
                        vm.topic = vm.module.topics[vm.topicIndex];
                    }
                });
        }
        init();

        function saveTopic(topic) {
            if(vm.topicIndex === 'new') {
                vm.module.topics.push(topic);
            } else {
                vm.module.topics[vm.topicIndex] = topic;
            }
            ModuleService
                .updateModule(vm.moduleId, vm.module)
                .then(function (response) {
                    $location.url('/module/' + vm.moduleId);
                });
        }
        
        function deleteTopic(index) {
            if(vm.topicIndex !== 'new') {
                vm.module.topics.splice(index, 1);
                ModuleService
                    .updateModule(vm.moduleId, vm.module)
                    .then(function (response) {
                        $location.url('/module/' + vm.moduleId);
                    });
            }
        }
    }
})();