(function()
{
    angular
        .module("SpeakApp")
        .controller("LoginCtrl", LoginCtrl);
    
    function LoginCtrl($scope, $location, $rootScope, UserService)
    {
        $scope.login = login;

        function login(user)
        {
            if(user)
            UserService
                .login(user)
                .then(
                    function(response)
                    {
                        $rootScope.currentUser = response.data;
                        $location.url("/activity");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
  
})();
