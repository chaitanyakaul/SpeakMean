(function () {
    angular
        .module('SpeakApp')
        .controller('TranscriptController', TranscriptController);

    function TranscriptController(TranscriptService) {
        var vm = this;
        vm.selectWord = selectWord;
        vm.selectedWords = [];

        function init() {
            vm.transcript = TranscriptService
                .findTranscriptById('123');
            var words = vm.transcript.split(' ');
            vm.words = [];
            for(var w in words) {
                vm.words.push({text: words[w], selected: false});
            }
        }
        init();
        
        function selectWord(index) {
            console.log(index);
            if(vm.words[index].selected === true) {
                vm.words[index].selected = false;
                var i = vm.selectedWords.indexOf(vm.words[index]);
                vm.selectedWords.splice(i, 1);
            } else if(vm.words[index].selected === false) {
                vm.words[index].selected = true;
                vm.selectedWords.push(vm.words[index]);
            } else {
                vm.words[index].selected = true;
                vm.selectedWords.push(vm.words[index]);
            }
            console.log(vm.words[index].selected);
            console.log(vm.selectedWords);
        }
    }
})();