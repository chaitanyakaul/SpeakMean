(function () {
    angular
        .module('SpeakApp')
        .service('SocketService', SocketService);
    
    function SocketService() {
        this.socket = {};
    }
})();