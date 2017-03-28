(function () {
    angular
        .module("SpeakApp")
        .factory('SessionService', SessionService);

    function SessionService($http) {
        var api = {
            createSession: createSession,
            findAllSessions: findAllSessions,
            findAllSessionsByCalled: findAllSessionsByCalled,
            findAllSessionsByCaller: findAllSessionsByCaller,
            findAllSessionsByUser: findAllSessionsByUser,
            findSessionById: findSessionById,
            updateSession: updateSession
        };

        return api;

        function updateSession(sessionId, session) {
            return $http.put('/api/session/'+sessionId, session);
        }

        function createSession(session) {
            return $http.post('/api/session', session);
        }

        function findAllSessionsByUser(userId) {
            return $http.get('/api/session/user/' + userId);
        }

        function findSessionById(sessionId) {
            return $http.get('/api/session/'+sessionId);
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