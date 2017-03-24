(function () {
    angular
        .module('SpeakApp')
        .controller('DictionaryNewController', DictionaryNewController);


    function DictionaryNewController($location, $routeParams, DictionaryService) {

        var vm = this;

        vm.createDictionary=createDictionary;

        function init() {


            console.log("init hit")
            vm.dictionary = "";
        }
        function createDictionary(dictionary){
            //console.log(vm.dictionary);
            console.log("create Dictionary Hit");
            var promise = DictionaryService.createDictionary(dictionary);
            promise.then(function (dictionary1)
            {

                $location.url("/dictionary/");

            }, function (error)
            {
                console.log(error)
            })
        }

    }
})();