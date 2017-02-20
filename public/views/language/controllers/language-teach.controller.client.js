(function () {
    angular
        .module('SpeakApp')
        .controller('LanguageTeachController', LanguageTeachController);
    
    function LanguageTeachController(LanguageService) {
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