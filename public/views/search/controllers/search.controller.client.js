(function () {
    angular
        .module("SpeakApp")
        .controller("SearchController", SearchController);
    
    function SearchController($location) {
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
            {name: 'English', value:'ENGLISH', regions: [{name: 'United States', value: 'UNITED_STATES'}, {name: 'United Kingdom', value: 'UNITED_KINGDOM'}]},
            {name: 'Spanish', value:'SPANISH', regions: [{name: 'Mexico', value: 'MEXICO'}, {name: 'Spain', value: 'SPAIN'}]}
        ];

        function init() {
            $( "#topic" ).autocomplete({
                source: topics,
                select: function( event, ui ) {
                    vm.topic = ui.item.value;
                }
            });
        }
        init();
        
        function search() {
            console.log(vm);
            var language = vm.language.value;
            var region = "";
            if (vm.region) {
                region = vm.region.value;
                language = language+'_'+vm.region.value;
            }

            $location.url('/search-results?language='+language);
        }
    }
})();