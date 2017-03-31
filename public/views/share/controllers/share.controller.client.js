(function () {
    angular
        .module("SpeakApp")
        .controller("ShareController", SearchController);
    
    function SearchController($location, $routeParams, SessionService) {
        var vm = this;
        vm.share = share;
        vm.sessionId = $routeParams.sessionId;

        var message = 'I just spoke to @OTHERUSER in #LANGUAGE about #MODULE module using #SpeakApp'

        function init() {
            SessionService
                .findSessionById(vm.sessionId)
                .then(function (response) {
                    vm.session = response.data;
                    var language = vm.session.language.split('_')[0].toLowerCase();
                    vm.message = message
                        .replace('LANGUAGE', language)
                        .replace('MODULE', vm.session.module.name)
                        .replace('OTHERUSER', vm.session.called.username);
                    vm.session.message = vm.message;
                });
        }
        init();
        
        function share() {
            SessionService
                .updateSession(vm.sessionId, vm.session)
                .then(function (response) {
                    $location.url('/session');
                });
        }
    }
})();