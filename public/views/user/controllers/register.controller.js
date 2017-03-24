(function()
{
    angular
        .module("SpeakApp")
        .controller("RegisterCtrl", RegisterCtrl);
        
    function RegisterCtrl($location, $rootScope, UserService)
    {
        var vm = this;
        vm.register = register;

        function init() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.user = null;
                });
        }
        init();

        function register(user)
        {
            if(user.password != user.password2 || !user.password || !user.password2)
            {
                vm.error = "Your passwords don't match";
            }
            else
            {
                UserService
                    .register(user)
                    .success(
                        function(user) {
                            if(user != null) {
                                $rootScope.user = user;
                                $location.url("/session");
                            }
                        })
                    .error(
                        function(err) {
                            vm.error = err;
                        }
                    );
            }
        }
    }
})();
