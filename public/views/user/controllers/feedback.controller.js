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
        vm.userId;

        function init() {
        }
        init();

        function updateValue(){
            console.log(vm.stars);
            console.log($rootScope.user._id);
            vm.userId = $rootScope.user._id;
            UserService
                .updateRatingForUser(vm.stars,vm.userId);
        }

        function change(value) {
            vm.stars = value;
        }

        function onClick(value) {
            console.log(value);
        }
    }
  
})();
