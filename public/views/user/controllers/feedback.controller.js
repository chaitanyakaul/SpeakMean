(function()
{
    angular
        .module("SpeakApp")
        .controller("FeedbackCtrl", FeedbackCtrl);
    
    function FeedbackCtrl($scope ,$location, $rootScope, UserService)
    {
        var vm = this;
        vm.onClick = onClick;
        vm.change = change;
        vm.updateValue = updateValue;
        vm.stars;

        function init() {

        }
        init();

        function updateValue(){
            console.log(vm.stars);
            UserService
                .updateRatingForUser(vm.stars)
        }

        function change(value) {
            vm.stars = value;
            console.log(vm.stars);
        }

        function onClick(value) {
            console.log(value);
        }
    }
  
})();
