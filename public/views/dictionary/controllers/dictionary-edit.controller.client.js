(function () {
    angular
        .module('SpeakApp')
        .controller('DictionaryEditController', DictionaryEditController);

    function DictionaryEditController($routeParams, DictionaryService, $location) {
        var vm = this;
        vm.updateDictionary = updateDictionary;
        vm.deleteDictionary = deleteDictionary

        function init() {
            vm.id = $routeParams.dictionaryId;
            var promise  = DictionaryService.findDictionaryById(vm.id);
           promise.then(function (dictionary)
           {
               vm.dictionary = dictionary.data[0]
               console.log(vm.dictionary)

           }, function (error)
           {
               console.log(error)
           })
        }
        init();


        function updateDictionary(dictionary)
        {
            console.log("update dictionary hit")
            var promise = DictionaryService.updateDictionary(dictionary._id, dictionary)
            promise.then(function (response)
            {
                $location.url("/dictionary/");
            }, function (error)
                {
                    console.log(error)
                }
            )

        }


        function deleteDictionary(dictionaryId)
        {
            console.log("client end delete controller")
            var promise = DictionaryService.deleteDictionary(dictionaryId)
            promise.then(function (response)
            {
                $location.url("/dictionary/");
            }, function (error)
            {
                console.log(error)
            })
        }


    }
})();