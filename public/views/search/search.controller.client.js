(function () {
    angular
        .module("SpeakApp")
        .controller("SearchController", SearchController);
    
    function SearchController($location) {
        var vm = this;
        vm.search = search;

        var topics = [
            "ActionScript",
            "AppleScript",
            "Asp",
            "BASIC",
            "C",
            "C++"
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
            $location.url('/search-results');
        }
    }
})();