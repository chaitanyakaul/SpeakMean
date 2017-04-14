/**
 * Created by niharikasharma on 4/10/17.
 */
(function () {
    angular
        .module("SpeakApp")
        .controller("AdminLanguageListController", AdminLanguageListController);

    function AdminLanguageListController(LanguageService) {
        var vm = this;

        function init() {
            LanguageService
                .findAllLanguages()
                .success(renderAllLanguages);
        }
        init();

        function renderAllLanguages(languages) {
            vm.languages = languages;
        }
    }
})();
