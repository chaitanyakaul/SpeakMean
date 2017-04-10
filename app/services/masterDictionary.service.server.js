module.exports = function (app, masterDictionaryModel) {
    app.get('/api/masterDictionary', findAllWords);
    app.post('/api/masterDictionary/addWord', addWord);
    app.put('/api/masterDictionary/deleteWord', deleteWord);
    app.put('api/masterDictionary/updateWord/:wordId', updateWord);

    function updateWord(req, res) {
        masterDictionaryModel
            .updateWord(req.params.wordId, req.body.word)
            .then(
                function (word) {
                    res.sendStatus(200);
                }, function (error) {
                    res.status(404).send(error);
                }
            )
    }
    function findAllWords(req,res) {
        console.log("find");
        // var words=["kjdhasf","shfafjkads","dfasffda"];
        // res.send(words);
        masterDictionaryModel
            .findAllWords()
            .then(
                function(words){
                    console.log(words);
                    res.send(words);
                },function (error) {
                    console.log(error);
                    res.status(404).send(error);
                }
            );
    }

    function addWord(req,res) {
        var word = req.body;
        console.log(word);
        masterDictionaryModel
            .addWord(word)
            .then(
                function (word) {
                    res.status(200).send(word);
                }, function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function deleteWord(req,res) {
        var word=req.body;
        console.log(req.body);
        masterDictionaryModel
            .deleteWord(word)
            .then(
                function (word) {
                    res.sendStatus(200);
                }, function (error) {
                    res.status(404).send(error);
                }
            );
    }
};