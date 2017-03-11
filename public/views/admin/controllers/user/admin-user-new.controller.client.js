(function () {
    angular
        .module("SpeakApp")
        .controller("AdminUserNewController", AdminUserNewController);

    function AdminUserNewController(UserService, $routeParams, $location) {
        var vm = this;
        vm.createUser = createUser;
        vm.toggleLearningLanguage = toggleLearningLanguage;
        vm.toggleTeachingLanguage = toggleTeachingLanguage;
        vm.toggleLearnerRole = toggleLearnerRole;
        vm.toggleCoachRole = toggleCoachRole;
        vm.languages = {
            learning: [],
            teaching: []
        };
        vm.roles = [];

        function toggleLearningLanguage(language) {
            // if not learning language already, then add it to the list
            if(vm.languages.learning[language]) {
                if($rootScope.user.languages.learning.indexOf(language) == -1) {
                    $rootScope.user.languages.learning.push(language);
                }
            } else {
                var index = $rootScope.user.languages.learning.indexOf(language);
                if(index >= 0) {
                    $rootScope.user.languages.learning.splice(index, 1);
                }
            }
            console.log($rootScope.user.languages.learning);
        }

        function toggleTeachingLanguage(language) {
            // if not teaching language already, then add it to the list
            if(vm.languages.teaching[language]) {
                if($rootScope.user.languages.teaching.indexOf(language) == -1) {
                    $rootScope.user.languages.teaching.push(language);
                }
            } else {
                var index = $rootScope.user.languages.teaching.indexOf(language);
                if(index >= 0) {
                    $rootScope.user.languages.teaching.splice(index, 1);
                }
            }
            console.log($rootScope.user.languages.teaching);
        }

        function toggleLearnerRole(role) {
            // if not role already, then add it to the list
            if(vm.roles[role]) {
                if($rootScope.user.roles.indexOf(role) == -1) {
                    $rootScope.user.roles.push(role);
                }
            } else {
                var index = $rootScope.user.roles.indexOf(role);
                if(index >= 0) {
                    $rootScope.user.roles.splice(index, 1);
                }
            }
            console.log($rootScope.user.roles);
        }

        function toggleCoachRole(role) {
            // if not role already, then add it to the list
            if(vm.roles[role]) {
                if($rootScope.user.roles.indexOf(role) == -1) {
                    $rootScope.user.roles.push(role);
                }
            } else {
                var index = $rootScope.user.roles.indexOf(role);
                if(index >= 0) {
                    $rootScope.user.roles.splice(index, 1);
                }
            }
            console.log($rootScope.user.roles);
        }


        function createUser(user) {
            UserService
                .createUser(user)
                .success(renderUser);
        }

        function returnToAdminUserList() {
            $location.url('/admin/user');
        }

        function renderUser(user) {
            vm.user = user;
        }
    }
})();