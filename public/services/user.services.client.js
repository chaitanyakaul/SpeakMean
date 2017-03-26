(function(){
    angular
        .module("SpeakApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser,
            updateUser: updateUser,
            createUser: createUser,
            findUserById: findUserById,
            findUsersByCriteria: findUsersByCriteria,
            updateRatingForUser: updateRatingForUser
        };
        return api;

        function findUsersByCriteria(criteria) {
            return $http.post('/api/user/search', criteria);
        }
        
        function logout() {
            return $http.post("/api/logout");
        }

        function createUser(user) {
            return $http.post('/api/user', user);
        }

        function updateUser(userId, user) {
            return $http.put('/api/user/'+userId, user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function findAllUsers() {
            return $http.get("/api/user");
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function updateRatingForUser(stars, userId) {
            console.log("Client rating");
            console.log(stars);
            console.log(userId);
            return $http.put('/api/user/' + userId + '/rating', {'stars': stars});
        }
    }
})();