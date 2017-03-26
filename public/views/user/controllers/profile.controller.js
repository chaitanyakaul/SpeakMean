(function()
{
    angular
        .module("SpeakApp")
        .controller('ProfileCtrl', ProfileCtrl);
    
    function ProfileCtrl($rootScope, UserService)
    {
        var vm = this;
        vm.updateUser = updateUser;
        vm.toggleLearningLanguage = toggleLearningLanguage;
        vm.toggleTeachingLanguage = toggleTeachingLanguage;
        vm.toggleLearnerRole = toggleLearnerRole;
        vm.toggleCoachRole = toggleCoachRole;
        vm.languages = {
            learning: [],
            teaching: []
        };
        vm.roles = [];
        vm.retrieveStars = retrieveStars;
        vm.stars;

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

        function updateUser(user)
        {
            UserService
                .updateUser(user._id, user)
                .success(
                    function(status) {
                        vm.message = 'User updated successfully';
                    }
                )
                .error(
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function retrieveStars() {
            vm.stars = $rootScope.user.stars;
            console.log("Profile Controller");
            console.log(vm.stars);
            console.log($rootScope.user._id);
        }
    }
})();
