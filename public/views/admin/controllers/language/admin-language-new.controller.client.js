/**
 * Created by niharikasharma on 4/10/17.
 */
(function () {
    angular
        .module("SpeakApp")
        .controller("AdminLanguageNewController", AdminLanguageNewController);

    function AdminLanguageNewController(LanguageService, $routeParams, $location, $rootScope) {
        var vm = this;
        vm.createLanguage = createLanguage;

        function createLanguage(language) {
            LanguageService
                .createLanguage(language)
                .success(returnToAdminLanguageList);
        }

        function returnToAdminLanguageList() {
            $location.url('/admin/language');
        }

        function renderLanguage(language) {
            vm.language = language;
        }
    }
})();
