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
            return $http.post('/api/dictionary', dictionary);
        }
        
        function findAllDictionaries() {
            console.log("service client find dictionaries");
            return $http.get('/api/dictionary');
        }
        
        function findDictionaryById(dictionaryId) {
            return $http.get('/api/dictionary/' + dictionaryId);
        }
        
        function updateDictionary(dictionaryId, dictionary) {
            return $http.put('/api/dictionary/' + dictionaryId, dictionary);
        }
        
        function deleteDictionary(dictionaryId) {
            return $http.delete('/api/dictionary/' + dictionaryId);
        }
    }
})();