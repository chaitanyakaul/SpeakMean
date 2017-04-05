(function()
{
    angular
        .module("SpeakApp")
        .controller('ProfileCtrl', ProfileCtrl);
    
    function ProfileCtrl($rootScope, UserService, ModuleService)
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
        vm.stars;

        function init() {
            vm.stars = $rootScope.user.stars;
            console.log("Init");
            console.log(vm.stars);
        }
        init();

        function init() {
            findAllModules()
                .then(renderModules)
        }
        init();

        function findAllModules() {
            return ModuleService
                .findAllModules();
        }

        function renderModules(response) {
            vm.modules = response.data;
        }

        function init() {
            findAllModules()
                .then(renderModules)
        }
        init();

        function findAllModules() {
            return ModuleService
                .findAllModules();
        }

        function renderModules(response) {
            vm.modules = response.data;
        }

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
            user.modules.teaching = [];
            user.modules.learning = [];
            vm.modules.forEach(function (module) {
                var teachingIndex = user.modules.teaching.indexOf(module._id);
                var learningIndex = user.modules.learning.indexOf(module._id);
                if(module.teaching) {
                    if(teachingIndex === -1) {
                        user.modules.teaching.push(module._id);
                    }
                } else {
                    if(teachingIndex > -1) {
                        user.modules.teaching.splice(teachingIndex, 1);
                    }
                }
                if(module.learning) {
                    if(learningIndex === -1) {
                        user.modules.learning.push(module._id);
                    }
                } else {
                    if(learningIndex > -1) {
                        user.modules.learning.splice(learningIndex, 1);
                    }
                }
            });
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
