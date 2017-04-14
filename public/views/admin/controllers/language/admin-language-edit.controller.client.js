/**
 * Created by niharikasharma on 4/10/17.
 */

(function () {
    angular
        .module('SpeakApp')
        .controller('AdminLanguageEditController', AdminLanguageEditController);

    function AdminLanguageEditController(LanguageService, $routeParams, $location) {
        var vm = this;
        vm.languageId = $routeParams.languageId;
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

        function updateLanguage(languageId, language) {
            LanguageService
                .updateLanguage(languageId, language)
                .success(function() {
                    vm.message = 'Language updated successfully';
                });
        }
    }
})();
