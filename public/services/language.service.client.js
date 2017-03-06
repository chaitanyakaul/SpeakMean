(function () {
    angular
        .module("SpeakApp")
        .service('LanguageService', LanguageService);
    
    function LanguageService($http) {
        var api = this;
        api.createLanguage = createLanguage;
        api.findAllLanguages = findAllLanguages;
        api.findLanguageById = findLanguageById;
        api.updateLanguage = updateLanguage;
        api.deleteLanguage = deleteLanguage

        function createLanguage(language) {
            return $http.post('/api/language', language);
        }

        function findAllLanguages() {
            return $http.get('/api/language');
        }

        function findLanguageById(languageId) {
            return $http.get('/api/language/' + languageId);
        }

        function updateLanguage(languageId, language) {
            return $http.put('/api/language' + languageId, language);
        }

        function deleteLanguage(languageId) {
            return $http.delete('/api/language' + languageId);
        }
    }
})();