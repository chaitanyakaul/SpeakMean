(function () {
    angular
        .module('SpeakApp')
        .controller('DictionaryEditController', DictionaryEditController);

    function DictionaryEditController($routeParams, DictionaryService, $location) {
        var vm = this;
        vm.updateDictionary = updateDictionary;
        vm.deleteDictionary = deleteDictionary;
        vm.createDictionary = createDictionary;
        vm.addWord = addWord;

        function init() {
            vm.dictionaryId = $routeParams.dictionaryId;
            if(vm.dictionaryId != 'new') {
                DictionaryService
                    .findDictionaryById(vm.dictionaryId)
                    .then(function (response) {
                        vm.dictionary = response.data;
                    }, function (error) {
                        console.log(error)
                    });
            }
        }
        init();

        function addWord(word) {
            vm.dictionary.words.push(word);
            DictionaryService
                .updateDictionary(dictionary._id, dictionary)
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