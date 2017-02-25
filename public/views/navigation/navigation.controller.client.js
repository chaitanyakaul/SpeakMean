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

        var titleConfig = {
            '/search': {title: 'Search', back: 'activity'},
            '/coach': {title: 'Language Coach', back: 'search-results'},
            '/search-results': {title: 'Search Results', back: 'search'},
            '/admin/user': {title: 'User Admin', back: 'admin'},
            '/admin/language': {title: 'Language Admin', back: 'admin'},
            '/admin/country': {title: 'Country Admin', back: 'admin'}
        };

        function getTitleForLocation() {
            var url = $location.url();
            var path = $location.path();
            if(titleConfig[path]) {
                return titleConfig[path].title;
            }
            var urlParts = path.split("/");
            return urlParts[1];
        }
        
        function backButton() {
            var url = $location.url();
            var path = $location.path();
            if(titleConfig[path]) {
                return titleConfig[path].back;
            }
            return null;
        }
    }
})();