/**
 * Created by niharikasharma on 3/29/17.
 */
(function () {
    angular
        .module('SpeakApp')
        .controller('AdminLanguageTeachController', AdminLanguageTeachController);

    function AdminLanguageTeachController($location, $routeParams, LanguageService, UserService) {
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
            var teachingIndex = vm.user.languages.teaching.indexOf(language._id);
            if(teachingIndex === -1) {
                vm.user.languages.teaching.push(language._id);
                var languageName = language.name;
            }
            else {
                if(teachingIndex > -1) {
                    vm.user.languages.teaching.splice(teachingIndex, 1);
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
