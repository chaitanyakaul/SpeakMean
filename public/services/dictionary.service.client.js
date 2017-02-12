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

        }
        
        function findAllDictionaries() {
            return $http.get('/api/dictionary');
        }
        
        function findDictionaryById() {
            
        }
        
        function updateDictionary() {
            
        }
        
        function deleteDictionary() {
            
        }
    }
})();