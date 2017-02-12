(function () {
    angular
        .module("SpeakApp")
        .controller("ActivityController", ActivityController);
    
    function ActivityController(ActivityService) {
        var vm = this;

        function init() {
            findAllActivities();
        }
        init();
        
        function findAllActivities() {
            ActivityService
                .findAllActivities()
                .success(setAllActivities)
        }

        function setAllActivities(activities) {
            vm.activities = activities;
        }
    }
})();