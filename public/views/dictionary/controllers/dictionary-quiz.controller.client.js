(function () {
    angular
        .module('SpeakApp')
        .controller('DictionaryQuizController', DictionaryQuizController);

    function DictionaryQuizController($routeParams, DictionaryService, $location, DictionaryApiService) {
        var vm = this;
        vm.dictionaryId = $routeParams.dictionaryId;

        function init() {
            DictionaryService
                .findDictionaryById(vm.dictionaryId)
                .then(function (dictionary) {
                    vm.dictionary = dictionary;
                }, function (error) {
                    console.log(error)
                });
        }
        init();
    }
})();