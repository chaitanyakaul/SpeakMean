(function()
{
    angular
        .module("SpeakApp")
        .controller("FeedbackCtrl", FeedbackCtrl);
    
    function FeedbackCtrl($location, $rootScope, UserService, $routeParams)
    {
        var vm = this;
        vm.onClick = onClick;
        vm.change = change;
        vm.stars = 2.5;
        vm.sessionId = $routeParams.sessionId;
        vm.done = done;

        function init() {
        }
        init();

        function change(ewq) {
            console.log(ewq);
        }
        
        function onClick(value) {
            console.log(value);
        }

        function done() {
            if($rootScope.user.currentRole === 'COACH') {
                $location.url('/session');
            } else {
                $location.url('/share/'+vm.sessionId);
            }
        }
    }
  
})();
