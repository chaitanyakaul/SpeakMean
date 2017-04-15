(function () {
    angular
        .module('SpeakApp')
        .controller('TranscriptController', TranscriptController);

    function TranscriptController($location, TranscriptService, DictionaryService, $routeParams) {
        var transcriptId = $routeParams['transcriptId'];
        var vm = this;
        vm.selectWord = selectWord;
        vm.unselectWord = unselectWord;
        vm.selectedWords = [];
        vm.skip = skip;
        vm.addWords = addWords;
            
        function init() {
            TranscriptService.findTranscriptById(transcriptId)
                .success(renderTranscript)
                .error(function (error) {
                    console.log(error);
                });
        }
        init();
        
        function addWords(dictionaryId) {
            // console.log("dictionary "+dictionaryId);
            var list = []
            for(var t in vm.selectedWords){
                list.push(vm.selectedWords[t].text);
            }
            var words = {words: list};
            DictionaryService
                .addWordsToDictionary(dictionaryId, words)
                .then(function () {
                    $location.url('/session');
                });
        }

        function skip() {
            console.log(vm.selectedWords.length);
            if(vm.selectedWords.length > 0){
                $('#myModal').modal('show');
            }else{
                $location.url("/session");
            }
        }
        function renderTranscript(transcript) {
            vm.transcript = transcript;
            console.log(vm.transcript);
            var words = vm.transcript.text.split(' ');
            vm.words = [];
            var wordsText = [];
            for(var w in words) {
                var words123 = htmlToPlaintext(words[w]).split(' ');
                for(ww in words123) {
                    wordsText.push(words123[ww]);
                }
            }
            for(var w in wordsText) {
                vm.words.push({text: wordsText[w], selected: false});
            }
            renderDictionaries();
        }
        
        function renderDictionaries() {
            DictionaryService
                .findAllDictionaries()
                .success(function (response) {
                    console.log("dictionaries");
                    console.log(response);
                    vm.dictionaries=response;
                })
                .error(function (error) {
                    console.log(error);
                });
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
            var i= vm.words.indexOf(vm.selectedWords[index]);
            console.log(vm.words[i]);
            vm.words[i].selected=false;
            console.log(vm.words[index]);
            vm.selectedWords.splice(index,1);
        }

        function htmlToPlaintext(text) {
            return text ? String(text).replace(/<[^>]+>/gm, ' ') : ' ';
        }
    }
})();