(function () {
    angular
        .module('SpeakApp')
        .controller('WordNewController', WordNewController);


    function WordNewController($location, $routeParams, WordService) {

        var vm = this;

        vm.createWord=createWord;
        vm.dictionaryId = $routeParams.dictionaryId;

        function init() {
            vm.word = "";
        }
        function createWord(word){
            var promise = WordService.createWord(vm.dictionaryId ,word);
            promise.then(function (word1)
            {
                $location.url("/dictionary/"+vm.dictionaryId+"/word");

            }, function (error)
            {
                console.log(error)
            })
        }

    }
})();