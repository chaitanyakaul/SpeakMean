(function () {
    angular
        .module('SpeakApp')
        .service('DictionaryService', DictionaryService);
    
    function DictionaryService($http) {
        this.createDictionary = createDictionary;
        this.findAllDictionaries = findAllDictionaries;
        this.findDictionaryById = findDictionaryById;
        this.updateDictionary = updateDictionary;
        this.deleteDictionary = deleteDictionary;

        function createDictionary(dictionary) {

            console.log("create dictionary mein hit");
            console.log(dictionary);
            return $http.post('/api/dictionary', dictionary);

        }

        function addWordList(list, dictionaryId){
            console.log(dictionaryId);
            return $http.post('/api/dictionary/'+dictionaryId,list);
        }
        function findAllDictionaries() {
            console.log("service client find dictionaries");
            return $http.get('/api/dictionary');
        }
        
        function findDictionaryById(dictionaryId) {
            return $http.get('/api/dictionary/'+dictionaryId)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function updateDictionary(dictionaryId, dictionary) {

            return $http.put('/api/dictionary/'+dictionaryId,dictionary)

        }
        
        function deleteDictionary(dictionaryId) {
            console.log("deletecall in client")
            return $http.delete('/api/dictionary/' + dictionaryId);
        }
    }
})();