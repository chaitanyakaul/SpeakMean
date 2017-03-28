(function () {
    angular
        .module("SpeakApp")
        .controller("ShareController", SearchController);
    
    function SearchController($location) {
        var vm = this;
        vm.share = share;

        function init() {
        }
        init();
        
        function share() {
            $location.url('/session');
        }
    }
})();