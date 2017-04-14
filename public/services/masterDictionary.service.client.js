(function () {
    angular
        .module('SpeakApp')
        .service('MasterDictionaryService', MasterDictionaryService);
    
    function MasterDictionaryService($http) {
        this.findAllWords=findAllWords;
        this.addWord=addWord;
        this.deleteWord=deleteWord;
        this.updateWord=updateWord;
        this.dictionaryUpdateOrder= dictionaryUpdateOrder;

        //Returns list of words to master dictionary
        function dictionaryUpdateOrder(id,si,ei) {
            return $http.put("/api/page/"+id+"/widget?initial="+si+"&final="+ei);
        }
        function findAllWords() {
           return $http.get('/api/masterDictionary');
        }

        function updateWord(oldWord, newWord) {
            console.log("oldWord "+oldWord.name);
            console.log("newWord "+newWord);
            return $http.put('/api/masterDictionary/updateWord/'+oldWord._id,{name:newWord});
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