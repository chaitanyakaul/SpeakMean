(function () {
    angular
        .module("SpeakApp")
        .controller("ActivityController", ActivityController);
    
    function ActivityController() {
        var vm = this;

        function init() {
            vm.activities = [
                {username: {_id: '123', first: "Larry", avatarImage: "", city: 'Paris'}, language: 'French', minutes: '20'},
                {username: {_id: '234', first: "Flinn", avatarImage: "", city: 'Spain'}, language: 'Spanish', minutes: '30'},
                {username: {_id: '345', first: "Daniel", avatarImage: "", city: 'UK'}, language: 'English', minutes: '40'},
                {username: {_id: '456', first: "Aviva", avatarImage: "", city: 'Italy'}, language: 'Italian', minutes: '10'},
                {username: {_id: '567', first: "Brayo", avatarImage: "", city: 'Brasil'}, language: 'Potuguese', minutes: '20'},
                {username: {_id: '678', first: "Alice", avatarImage: "", city: 'Poland'}, language: 'Polish', minutes: '30'},
                {username: {_id: '789', first: "Bob", avatarImage: "", city: 'Russia'}, language: 'Russian', minutes: '40'}
            ];
        }
        init();
    }
})();