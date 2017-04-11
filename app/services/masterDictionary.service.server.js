module.exports = function (app, masterDictionaryModel) {
    app.get('/api/masterDictionary', findAllWords);
    app.post('/api/masterDictionary/addWord', addWord);
    app.put('/api/masterDictionary/deleteWord', deleteWord);
    app.put('/api/masterDictionary/updateWord/:wordId', updateWord);
    app.put("/api/page/:Id/widget",updateDictionaryOrder);

    function updateDictionaryOrder(req,res) {

        var Id = req.params.Id;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        masterDictionaryModel
            .sortDictionary(startIndex,endIndex,Id)
            .then(function () {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
        //
        // var index=[]
        // for(var w in widgets){
        //     if(widgets[w].pageId==pageId){
        //         index.push(w);
        //     }
        // }
        //
        // for(var i=startIndex;i<endIndex;i++){
        //     var temp=widgets[index[i]];
        //     widgets[index[i]]=widgets[index[i+1]];
        //     widgets[index[i+1]]=temp;
        // }
        //
        // for(var i=startIndex;i>endIndex;i--){
        //     var temp=widgets[index[i]];
        //     widgets[index[i]]=widgets[index[i-1]];
        //     widgets[index[i-1]]=temp;
        // }
        //
        // res.sendStatus(200);


    }

    function updateWord(req, res) {
        masterDictionaryModel
            .updateWord(req.params.wordId, req.body)
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