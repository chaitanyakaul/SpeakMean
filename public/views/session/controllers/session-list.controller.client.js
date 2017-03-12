(function () {
    angular
        .module("SpeakApp")
        .controller("SessionController", SessionController);
    
    function SessionController(SessionService, $rootScope) {
        var vm = this;

        function init() {
            if($rootScope.user) {
                findAllSessionsByUser($rootScope.user._id);
            }
        }
        init();
        
        function findAllSessionsByUser(userId) {
            SessionService
                .findAllSessionsByUser(userId)
                .success(setAllSessions)
        }

        function setAllSessions(sessions) {
            vm.sessions = sessions;
        }
    }
})();