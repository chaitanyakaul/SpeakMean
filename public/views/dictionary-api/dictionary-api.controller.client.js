"use strict";

(function () {
    angular
        .module("SpeakApp")
        .controller("DictionaryApiController", DictionaryApiController);

    function DictionaryApiController(DictionaryApiService, $scope, $rootScope, $location) {
        var vm = this;
        vm.searchQuery = searchQuery;
        
        function init(){
            vm.lang = "en";
        }


        init();

        function searchQuery(lang, word) {
            console.log(lang + "   " + word);
            DictionaryApiService.searchQuery(lang, word)
                .then(function (response) {
                    if(response.data){
                        vm.data = response.data;
                    }
                    else{
                        console.log("Check request for retrieving the list of words");
                    }
                }, function (err) {
                    console.log(err);
                });
        }


    }
})();