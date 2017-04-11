(function () {
    angular
        .module('SpeakApp')
        .controller('MasterDictionaryEditController', MasterDictionaryEditController);

    function MasterDictionaryEditController($routeParams, MasterDictionaryService, $location) {
        var vm=this;
        vm.addWord=addWord;
        vm.deleteWord=deleteWord;
        vm.saveWord=saveWord;
        vm.updateWord=updateWord;

        function updateWord(word) {
            MasterDictionaryService
                .updateWord(vm.savedWord,word)
                .success(function (word) {
                    console.log("word updated");
                    findAllWords();
                })
                .error(function (error) {
                    console.log("could not update");
                });
        }
        function saveWord(word) {
            vm.savedWord=word;
            console.log(vm.savedWord);
        }


        function init() {
            findAllWords();
        }
        init();
        function findAllWords() {
            MasterDictionaryService
                .findAllWords()
                .success(function (words) {
                    vm.words=words;
                    console.log(words);
                })
                .error(function (error) {
                    vm.error=error;
                });
        }
        function addWord(word){
            MasterDictionaryService
                .addWord(word)
                .success(function (word) {
                    findAllWords();
                    
                    console.log("Word Added");

                })
                .error(function (error) {
                    console.log("error");
                });
        }

        function deleteWord(word) {
            var index = vm.words.indexOf(word);
            vm.words.splice(index, 1);
            console.log(vm.words);
            MasterDictionaryService
                .deleteWord(word)
                .then(function (response)
                    {
                        console.log(response);
                    }, function (error)
                    {
                        console.log(error);
                    }
                );
        }


    }

})();