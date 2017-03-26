(function () {
    angular
        .module('SpeakApp')
        .service('WordService', WordService);

    function WordService($http) {
        this.createWord = createWord;
        this.findWordsByDictionaryId = findWordsByDictionaryId;
        this.removeWordFromDictionary = removeWordFromDictionary
        this.updateWord = updateWord

        function createWord(dictionaryId, word) {

            console.log("create word mein hit");
            console.log(word);
            return $http.post('/api/dictionary/'+dictionaryId+'/word' , word);

        }


        function findWordsByDictionaryId(dictionaryId) {
            console.log("find all worlds")
            console.log(dictionaryId);
            return $http.get('/api/dictionary/'+dictionaryId+'/word');
        }


        function removeWordFromDictionary(dictionaryId, word) {
            console.log("controlled reached the client")
            console.log(word);
            return $http.delete('/api/dictionary/'+dictionaryId+'/word/'+word);
        }


        function updateWord(dictionaryId, word, word_new)
        {

            return $http.put('/api/dictionary/'+dictionaryId+'/word/'+word+'/word_new/'+word_new);

        }


    }
})();