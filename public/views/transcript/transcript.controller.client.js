(function () {
    angular
        .module('SpeakApp')
        .controller('TranscriptController', TranscriptController);

    function TranscriptController(TranscriptService, $routeParams) {
        var transcriptId = $routeParams['transcriptId']
        var vm = this;
        vm.selectWord = selectWord;
        vm.unselectWord=unselectWord;
        vm.selectedWords = [];

        function init() {
            var promise= TranscriptService.findTranscriptById(transcriptId);
             promise
                 .success(renderTranscript)
                 .error(function (error) {
                     console.log(error);
                 });
        }
        init();

        function renderTranscript(transcript) {
            vm.transcript = transcript;
            console.log(vm.transcript);
            var words = vm.transcript.text.split(' ');
            vm.words = [];
            for(var w in words) {
                vm.words.push({text: words[w], selected: false});
            }
            // vm.transcript = transcript.text;
        }
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
        function unselectWord(index){
            console.log(index);
            vm.words[index].selected=false;
            var i = vm.selectedWords.indexOf(vm.words[index]);
            vm.selectedWords.splice(i,1);
        }
    }
})();