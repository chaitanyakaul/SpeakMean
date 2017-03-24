(function () {
    angular
        .module("SpeakApp")
        .controller("TranslationController", TranslationController);


    function TranslationController($http) {
        var vm = this;
        vm.translate = translate;

        vm.languages = [
            {name: 'English', value:'en'},
            {name: 'Spanish', value:'es'},
            {name: 'Russian', value:'ru'},
            {name: 'Hindi', value:'hi'},
            {name: 'French', value:'fr'},

        ];
        
        function translate(input) {
            var inputLanguage = vm.language.value;
            var outputLanguage = vm.outputLanguage.value;


            var request = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170306T165730Z.f726ea336807d77a.82b740f0af88a6732b4be83618747df8c4121099&text="+input+"%20&lang="+inputLanguage+"-"+outputLanguage
            $http.get(request)
                .success(renderTranslationDetails);



        }

        function renderTranslationDetails(result)
        {
            vm.mover = result;
            console.log(vm.mover);

        }
    }
})();