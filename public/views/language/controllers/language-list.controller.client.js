/**
 * Created by niharikasharma on 4/10/17.
 */

(function () {
    angular
        .module('SpeakApp')
        .controller('LanguageListController', LanguageListController);

    function LanguageListController(LanguageService, $route, $location) {
        var vm = this;
        vm.createLanguage = createLanguage;
        vm.deleteLanguage = deleteLanguage;

        function init() {
            LanguageService
                .findAllLanguages()
                .success(function (languages) {
                    vm.languages = languages;
                })
        }
        init();

        function createLanguage() {
            LanguageService
                .createLanguage({'name':Name})
                .success(function(language) {
                    $location.url('/language/'+language._id);
                });
        }

        function deleteLanguage(languageId) {
            var answer = confirm('Are you sure you want to delete the language?')
            if(answer){
                LanguageService
                    .deleteLanguage(languageId)
                    .success(function (status) {
                        $route.reload();
                    })
            }
        }
    }
})();
