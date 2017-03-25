(function () {
    angular
        .module('SpeakApp')
        .controller('TranscriptController', TranscriptController);

    function TranscriptController($location,TranscriptService, $routeParams) {
        var transcriptId = $routeParams['transcriptId'];
        var vm = this;
        vm.selectWord = selectWord;
        vm.unselectWord=unselectWord;
        vm.selectedWords = [];
        vm.skip=skip;
        function init() {
            var promise= TranscriptService.findTranscriptById(transcriptId);
             promise
                 .success(renderTranscript)
                 .error(function (error) {
                     console.log(error);
                 });
        }
        init();
        function skip() {

            console.log(vm.selectedWords.length);
            if(vm.selectedWords.length>0){
                $('#myModal').modal('show');
            }else{
                $location.url("/feedback");
            }
        }
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