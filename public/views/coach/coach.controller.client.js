(function()
{
    angular
        .module("SpeakApp")
        .controller('CoachCtrl', CoachCtrl);
    
    function CoachCtrl($routeParams, UserService)
    {
        var vm = this;
        vm.update = update;
        vm.userId = $routeParams.userId;

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(renderCoach);
        }
        init();

        function renderCoach(coach) {
            vm.coach = coach;
        }
        
        function update(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response) {
                        $scope.users = response.data;
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();
