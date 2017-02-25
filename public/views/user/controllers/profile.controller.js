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
        vm.languages = {
            learning: [],
            teaching: []
        };

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
    }
})();
