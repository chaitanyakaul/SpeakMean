(function () {
    angular
        .module("SpeakApp")
        .factory('SessionService', SessionService);

    function SessionService($http) {
        var api = {
            createSession: createSession,
            findAllSessions: findAllSessions,
            findAllSessionsByCalled: findAllSessionsByCalled,
            findAllSessionsByCaller: findAllSessionsByCaller
        };

        return api;

        function createSession(session) {
            return $http.post('/api/session', session);
        }

        function findAllSessions() {
            return $http.get('/api/session');
        }

        function findAllSessionsByCalled(calledId) {
            return $http.get('/api/session/called'+calledId);
        }

        function findAllSessionsByCaller(callerId) {
            return $http.get('/api/session/caller'+callerId);
        }
    }
})();