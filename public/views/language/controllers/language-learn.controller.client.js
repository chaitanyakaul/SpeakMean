(function () {
    angular
        .module('SpeakApp')
        .controller('LanguageLearnController', LanguageLearnController);
    
    function LanguageLearnController(LanguageService) {
        var vm = this;

        function init() {
            LanguageService
                .findAllLanguages()
                .success(function (languages) {
                    vm.languages = languages;
                })
        }
        init();

    }
})();