(function () {
    angular
        .module('SpeakApp')
        .service('WordService', WordService);

    function WordService($http) {
        this.createWord = createWord;
        this.findWordsByDictionaryId = findWordsByDictionaryId;

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
    }
})();