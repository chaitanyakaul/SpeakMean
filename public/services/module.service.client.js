(function () {
    angular
        .module("SpeakApp")
        .service('ModuleService', ModuleService);
    
    function ModuleService($http) {
        var api = this;
        api.createModule = createModule;
        api.findAllModules = findAllModules;
        api.findModuleById = findModuleById;
        api.updateModule = updateModule;
        api.deleteModule = deleteModule

        function createModule(module) {
            return $http.post('/api/module', module);
        }

        function findAllModules() {
            return $http.get('/api/module');
        }

        function findModuleById(moduleId) {
            return $http.get('/api/module/' + moduleId);
        }

        function updateModule(moduleId, module) {
            return $http.put('/api/module/' + moduleId, module);
        }

        function deleteModule(moduleId) {
            return $http.delete('/api/module' + moduleId);
        }
    }
})();