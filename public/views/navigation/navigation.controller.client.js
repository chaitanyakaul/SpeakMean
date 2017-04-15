(function () {
    angular
        .module("SpeakApp")
        .controller('NavigationController', NavigationController);

    function NavigationController($scope, $location, UserService, SocketService, $rootScope) {
        var vm = this;
        vm.backButton = backButton;
        vm.getTitleForLocation = getTitleForLocation;
        vm.logout = logout;

        if(location.hostname.indexOf('localhost') > -1) {
            SocketService.socket = io('http://localhost:3000');
        } else {
            SocketService.socket = io('https://speak-mean.herokuapp.com');
        }
        SocketService.socket.on('spk-broadcast', function(message){
            if(message.coach._id == $rootScope.user._id) {
                var accept = confirm(message.coach.username + ', you have a call from ' + message.learner.username + '. Do you wish to accept?');
                if(accept) {
                    var url = '/twilio/' + message.coach._id;
                    $location.url(url);
                    $scope.$apply();
                }
            }
        });

        function init() {
        }
        init();

        var titleConfig = {
            '/dictionary': {title: 'Dictionaries', back: 'session'},
            '/dictionary/new': {title: 'New Dictionary', back: 'dictionary'},
            '/dictionary/.*': {title: 'Edit Dictionary', back: 'dictionary'},
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