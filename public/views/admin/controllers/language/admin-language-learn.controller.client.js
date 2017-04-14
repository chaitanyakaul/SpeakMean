/**
 * Created by niharikasharma on 3/29/17.
 */
(function () {
    angular
        .module('SpeakApp')
        .controller('AdminLanguageLearnController', AdminLanguageLearnController);

    function AdminLanguageLearnController($location, $routeParams, LanguageService, UserService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.toggleLanguageSelection = toggleLanguageSelection;
        vm.selectLanguages = selectLanguages;

        function init() {
            LanguageService
                .findAllLanguages()
                .success(function (languages) {
                    // console.log(languages);
                    vm.languages = languages;
                })

            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    // console.log(user);
                    vm.user = user;
                })
        }
        init();



        function toggleLanguageSelection(language) {
            // if not learning module already, then add it to the list
            var learningIndex = vm.user.languages.learning.indexOf(language._id);
            if(learningIndex === -1) {
                vm.user.languages.learning.push(language._id);
                var languageName = language.name;
            }
            else {
                if(learningIndex > -1) {
                    vm.user.languages.learning.splice(learningIndex, 1);
                }
            }
            // console.log(vm.user);
        }

        function selectLanguages(userId, user) {
            UserService
                .updateUser(userId, user)
                .success(function(status) {
                    $location.url("/admin/user/" + vm.userId);
                });
        }
    }
})();
