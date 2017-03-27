(function () {
    angular
        .module('SpeakApp')
        .controller('WordListController', WordListController);

    function WordListController($routeParams, WordService) {
        var vm = this;
        vm.dictionaryId = $routeParams.dictionaryId;
        vm.remove = remove
        vm.updateWord = updateWord
        function init() {
            console.log(vm.dictionaryId);



            WordService
                .findWordsByDictionaryId(vm.dictionaryId)
                .then(function (words) {
                    vm.word = words.data[0].vocabulary;
                    console.log("Found words");
                    console.log(vm.word);

                },function (error)
                {
                    console.log(error);
                })
        }
        init();
//update

        function remove(word)
        {
            console.log("hit in word")
            console.log(vm.dictionaryId, word);
            WordService
                .removeWordFromDictionary(vm.dictionaryId, word)
                .then (function (response)
                {
                    init();
                }, function (error)
                {
                    console.log(error)
                })

        }


        function updateWord(word, word_new)
        {

            WordService
                .updateWord(vm.dictionaryId, word, word_new)
                .then (function (response)
                {
                    init()
                }, function (error)
                {
                    console.log(error)
                })
        }

    }
})();