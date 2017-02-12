(function () {
    angular
        .module("SpeakApp")
        .controller('NavigationController', NavigationController);

    function NavigationController($location) {
        var vm = this;
        vm.backButton = backButton;
        
        function init() {
        }
        init();
        
        function backButton() {
            var url = $location.url();
            if (url === '/search') {
                return 'activity';
            } else if (url === "/search-results") {
                return 'search';
            } else if (url === '/contact') {
                return 'search-results';
            }
            return null;
        }
    }
})();