(function () {
    angular
        .module('SpeakApp')
        .service('MasterDictionaryService', MasterDictionaryService);
    
    function MasterDictionaryService($http) {
        this.findAllWords=findAllWords;
        this.addWord=addWord;
        this.deleteWord=deleteWord;
        //Returns list of words to master dictionary
        function findAllWords() {
           return $http.get('/api/masterDictionary');
        }

        function addWord(word) {
            console.log({'Name' : word});
            return $http.post('/api/masterDictionary/addWord', {'name' : word});
        }

        function deleteWord(word) {
            console.log("delete"+word);
            return $http.put('/api/masterDictionary/deleteWord', word);
        }
    }
})();