(function () {
    angular
        .module('SpeakApp')
        .controller('DictionaryListController', DictionaryListController);

    function DictionaryListController($routeParams, DictionaryService) {
        var vm = this;

        function init() {
            DictionaryService
                .findAllDictionaries()
                .success(function (dictionaries) {
                    vm.dictionaries = dictionaries;
                })
        }
        init();
    }
})();