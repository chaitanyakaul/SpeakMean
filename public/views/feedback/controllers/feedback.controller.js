(function()
{
    angular
        .module("SpeakApp")
        .controller("FeedbackCtrl", FeedbackCtrl);

    function FeedbackCtrl($scope ,$routeParams, $location, $rootScope, UserService, SessionService)
    {
        var vm = this;
        vm.onClick = onClick;
        vm.change = change;
        vm.updateValue = updateValue;
        vm.stars;
        vm.userId;
        vm.sessionId = $routeParams.sessionId;
        vm.done = done;

        function init() {
            SessionService
                .findSessionById(vm.sessionId)
                .then(function (response) {
                    vm.session = response.data;
                });
        }
        init();

        function updateValue(){
            console.log(vm.session);
            // SessionService
            //     .updateRatingForSession(vm.session);
            // console.log(vm.stars);
            // console.log($rootScope.user._id);
            vm.userId = $rootScope.user._id;
            UserService
                .updateRatingForUser(vm.session.learnerRating.coachRating,vm.userId);
        }

        function change(value) {
            vm.stars = value;
        }

        function onClick(value) {
            console.log(value);
        }

        function done() {
            vm.userId = $rootScope.user._id;
            if($rootScope.user.currentRole === 'COACH') {
                // UserService
                //     .updateRatingForUser(vm.session.coachRating.learnerRating,vm.userId)
                //     .then(function () {
                //         $location.url('/session');
                //     });
                $location.url('/session');
            } else {
                // UserService
                //     .updateRatingForUser(vm.session.learnerRating.coachRating,vm.userId)
                //     .then(function () {
                //         $location.url('/share/'+vm.sessionId);
                //     });
                $location.url('/share/'+vm.sessionId);
            }
        }
    }
})();
