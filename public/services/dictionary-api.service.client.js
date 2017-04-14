"use strict";

(function () {
    angular
        .module("SpeakApp")
        .service('DictionaryApiService', DictionaryApiService)

    function DictionaryApiService($http){
        var api = {
            searchQuery : searchQuery
        };
        
        return api;

        //Retrieve available results for a search query and language.
        function searchQuery(lang, word) {
            return $http.get("/api/oxford/query/language/"+lang+"/word/"+word);
        }

    }

})();