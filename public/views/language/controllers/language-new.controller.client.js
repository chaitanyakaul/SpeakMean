/**
 * Created by niharikasharma on 4/10/17.
 */
(function () {
    angular
        .module("SpeakApp")
        .controller("LanguageNewController", LanguageNewController);

    function LanguageNewController(LanguageService, $location) {
        var vm = this;
        vm.createLanguage = createLanguage;

        function createLanguage(language) {
            LanguageService
                .createLanguage(language)
                .success(returnToLanguageList);
        }

        function returnToLanguageList() {
            $location.url('/language');
        }
    }
})();