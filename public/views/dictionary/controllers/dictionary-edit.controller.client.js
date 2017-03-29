(function () {
    angular
        .module('SpeakApp')
        .controller('DictionaryEditController', DictionaryEditController);

    function DictionaryEditController($routeParams, DictionaryService, $location) {
        var vm = this;
        vm.dictionaryId = $routeParams.dictionaryId;
        vm.updateDictionary = updateDictionary;
        vm.deleteDictionary = deleteDictionary;
        vm.createDictionary = createDictionary;
        vm.addWord = addWord;
        vm.deleteWord = deleteWord;

        function init() {
            if(vm.dictionaryId != 'new') {
                DictionaryService
                    .findDictionaryById(vm.dictionaryId)
                    .then(function (dictionary) {
                        vm.dictionary = dictionary;
                    }, function (error) {
                        console.log(error)
                    });
            }
        }
        init();

        function deleteWord(word) {
            var index = vm.dictionary.vocabulary.indexOf(word);
            vm.dictionary.vocabulary.splice(index, 1);
            DictionaryService
                .updateDictionary(vm.dictionary._id, vm.dictionary)
                .then(function (response)
                    {
                    }, function (error)
                    {
                        console.log(error)
                    }
                );
        }

        function addWord(word) {
            vm.word = null;
            if(!vm.dictionary.vocabulary) {
                vm.dictionary.vocabulary = [];
            }
            vm.dictionary.vocabulary.push(word);
            DictionaryService
                .updateDictionary(vm.dictionary._id, vm.dictionary)
                .then(function (response)
                    {
                    }, function (error)
                    {
                        console.log(error)
                    }
                );
        }

        function createDictionary(dictionary){
            DictionaryService
                .createDictionary(dictionary)
                .then(function (dictionary1)
                {
                    $location.url("/dictionary/");
                }, function (error)
                {
                    console.log(error)
                });
        }

        function updateDictionary(dictionary)
        {
            DictionaryService
                .updateDictionary(dictionary._id, dictionary)
                .then(function (response)
                {
                    $location.url("/dictionary/");
                }, function (error)
                    {
                        console.log(error)
                    }
                );
        }

        function deleteDictionary(dictionaryId)
        {
            DictionaryService
                .deleteDictionary(dictionaryId)
                .then(function (response)
                {
                    $location.url("/dictionary/");
                }, function (error)
                {
                    console.log(error)
                });
        }


    }
})();