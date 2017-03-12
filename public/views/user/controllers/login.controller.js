(function()
{
    angular
        .module("SpeakApp")
        .controller("LoginCtrl", LoginCtrl);
    
    function LoginCtrl($scope, $location, $rootScope, UserService)
    {
        $scope.login = login;

        function init() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.user = null;
                });
        }
        init();

        function login(user)
        {
            if(user)
            UserService
                .login(user)
                .then(
                    function(response)
                    {
                        $rootScope.user = response.data;
                        $location.url("/session");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
  
})();
