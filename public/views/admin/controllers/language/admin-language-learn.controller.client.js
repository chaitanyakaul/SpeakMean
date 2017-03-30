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
            // if not teaching Language already, then add it to the list
            if(vm.user.languages.learning.indexOf(language.name) == -1) {
                vm.user.languages.learning.push(language.name);
            }
            else {
                var index = vm.user.languages.learning.indexOf(language.name);
                if(index >= 0) {
                    vm.user.languages.learning.splice(index, 1);
                }
            }
            // console.log(vm.user.languages.learning);
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
