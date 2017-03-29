(function () {
    angular
        .module("SpeakApp")
        .controller("SearchController", SearchController);
    
    function SearchController($location, ModuleService) {
        var vm = this;
        vm.search = search;

        var topics = [
            "Food",
            "Travel",
            "Hotel",
            "Points of Interest",
            "Tourism",
            "Education",
            "Culture",
            "Hiking",
            "Entertainment"
        ];

        vm.languages = [
            {name: 'English', value:'english', regions: [{name: 'United States', value: 'us'}, {name: 'United Kingdom', value: 'uk'}]},
            {name: 'Spanish', value:'spanish', regions: [{name: 'Mexico', value: 'mexico'}, {name: 'Spain', value: 'spain'}]}
        ];

        function init() {
            $( "#topic" ).autocomplete({
                source: topics,
                select: function( event, ui ) {
                    vm.topic = ui.item.value;
                }
            });
            ModuleService
                .findAllModules()
                .then(function (response) {
                    vm.modules = response.data;
                });
        }
        init();
        
        function search() {
            var language = vm.language.value;
            var region = "";
            if (vm.region) {
                region = vm.region.value;
                language = language+'_'+vm.region.value;
            }

            $location.url('/search-results/'+language+'/'+vm.moduleId);
        }
    }
})();