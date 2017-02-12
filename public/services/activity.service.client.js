(function () {
    angular
        .module("SpeakApp")
        .service('ActivityService', ActivityService);
    
    function ActivityService($http) {
        var api = this;
        api.findAllActivities = findAllActivities;

        function findAllActivities() {
            return $http.get('/api/activity');
        }
    }
})();