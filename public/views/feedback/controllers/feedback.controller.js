(function()
{
    angular
        .module("SpeakApp")
        .controller("FeedbackCtrl", FeedbackCtrl);
    
    function FeedbackCtrl($location, $rootScope, UserService)
    {
        var vm = this;
        vm.onClick = onClick;
        vm.change = change;
        vm.stars = 2.5;
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
            $location.url('/share');
        }
    }
  
})();
