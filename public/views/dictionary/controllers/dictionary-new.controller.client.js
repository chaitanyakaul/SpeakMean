(function () {
    angular
        .module('SpeakApp')
        .controller('DictionaryNewController', DictionaryNewController);

    function DictionaryNewController($routeParams, DictionaryService) {
        var vm = this;

        vm.createDictionary=createDictionary;

        function init() {

        }
        init();

        function createDictionary(){
            DictionaryService.createDictionary(vm.dictionary);
            $location.url("#/location");
        }
    }
})();