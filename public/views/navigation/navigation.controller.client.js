(function () {
    angular
        .module("SpeakApp")
        .controller('NavigationController', NavigationController);

    function NavigationController($location, UserService) {
        var vm = this;
        vm.backButton = backButton;
        vm.getTitleForLocation = getTitleForLocation;
        vm.logout = logout;
        
        function init() {
        }
        init();

        var titleConfig = {
            '/module/.*': {title: 'Edit Module', back: 'module'},
            '/module/new': {title: 'New Module', back: 'module'},
            '/module': {title: 'Modules', back: 'session'},
            '/search': {title: 'Search', back: 'activity'},
            '/coach': {title: 'Language Coach', back: 'search-results'},
            '/search-results': {title: 'Search Results', back: 'search'},
            '/admin/user': {title: 'User Admin', back: 'admin'},
            '/admin/language': {title: 'Language Admin', back: 'admin'},
            '/admin/country': {title: 'Country Admin', back: 'admin'}
        };

        function logout() {
            UserService
                .logout()
                .success(function(){
                    $location.url('/login');
                });
        }

        function getTitleForLocation() {
            var url = $location.url();
            var path = $location.path();
            if(titleConfig[path]) {
                return titleConfig[path].title;
            }
            for(var k in titleConfig) {
                if(path.match(k) != null) {
                    return titleConfig[k].title;
                    break;
                }
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
            for(var t in titleConfig) {
                if(path.match(t) != null) {
                    return titleConfig[t].back;
                    break;
                }
            }
            return null;
        }
    }
})();