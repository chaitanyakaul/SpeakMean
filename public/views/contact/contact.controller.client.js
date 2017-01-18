(function()
{
    angular
        .module("SpeakApp")
        .controller('ContactCtrl', ContactCtrl);
    
    function ContactCtrl($scope, UserService)
    {
        $scope.update = update;

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
