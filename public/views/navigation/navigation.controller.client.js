(function () {
    angular
        .module("SpeakApp")
        .controller('NavigationController', NavigationController);

    function NavigationController($location) {
        var vm = this;
        vm.backButton = backButton;
        vm.getTitleForLocation = getTitleForLocation;
        
        function init() {
        }
        init();
        
        function getTitleForLocation() {
            var url = $location.url()
            var urlParts = url.split("/");
            console.log(urlParts);
            return urlParts[1];
        }
        
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