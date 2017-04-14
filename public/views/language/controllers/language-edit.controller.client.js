/*** Created by niharikasharma on 4/10/17.*/

(function () {
    angular
        .module('SpeakApp')
        .controller('LanguageEditController', LanguageEditController);

    function LanguageEditController(LanguageService, $routeParams, $location) {
        var vm = this;
        vm.languageId = $routeParams.languageId;
        vm.updateLanguage = updateLanguage;
        vm.deleteLanguage = deleteLanguage;

        function init() {
            if(vm.languageId != 'new') {
                LanguageService
                    .findLanguageById(vm.languageId)
                    .success(function (language) {
                        vm.language = language[0];
                    });
            }
        }
        init();

        function deleteLanguage(languageId) {
            var answer = confirm('Are you sure you want to delete the language?')
            if(answer){
                LanguageService
                    .deleteLanguage(languageId)
                    .success(function (status) {
                        $location.url('/language');
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
