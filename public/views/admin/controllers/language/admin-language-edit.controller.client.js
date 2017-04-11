/**
 * Created by niharikasharma on 4/10/17.
 */

(function () {
    angular
        .module('SpeakApp')
        .controller('LanguageEditController', LanguageEditController);

    function LanguageEditController(LanguageService, $routeParams, $location) {
        var vm = this;
        vm.languageId = $routeParams.languageId;

        vm.createLanguage = createLanguage;
        vm.updateLanguage = updateLanguage;
        vm.deleteLanguage = deleteLanguage;

        function init() {
            LanguageService
                .findLanguageById(vm.languageId)
                .success(function (language) {
                    vm.language = language[0];
                });
        }
        init();

        function createLanguage() {
            LanguageService
                .createLanguage(vm.language)
                .success(function() {
                    $location.url('/admin/language');
                });
        }

        function deleteLanguage(languageId) {
            var answer = confirm('Are you sure you want to delete the language?')
            if(answer){
                LanguageService
                    .deleteLanguage(languageId)
                    .success(function (status) {
                        $location.url('/admin/language');
                    })
            }
        }

        function updateLanguage() {
            LanguageService
                .updateLanguage(vm.languageId, vm.language)
                .success(function() {
                    vm.message = 'Language updated successfully';
                });
        }
    }
})();
