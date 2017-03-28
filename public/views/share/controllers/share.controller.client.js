(function () {
    angular
        .module("SpeakApp")
        .controller("ShareController", SearchController);
    
    function SearchController($location, $routeParams) {
        var vm = this;
        vm.share = share;
        vm.sessionId = $routeParams.sessionId;

        var message = 'I just spoke to @OTHERUSER in #LANGUAGE about #MODULE module using #SpeakApp'

        function init() {
        }
        init();
        
        function share() {
            $location.url('/session');
        }
    }
})();