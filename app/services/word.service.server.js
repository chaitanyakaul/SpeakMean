/**
 * Created by chaitanyakaul on 25/03/17.
 */
module.exports = function (app, dictionaryModel) {
    app.post('/api/dictionary/:dictionaryId/word', createWord);
    app.get('/api/dictionary/:dictionaryId/word/', findAllWordsByDictionaryId);
   

    function createWord(req, res) {
        var word = req.body;
        var dictionaryId = req.params.dictionaryId;


        return dictionaryModel
            .createWord(dictionaryId, word)
            .then (function (response)
            {
                console.log("inserted")
                res.sendStatus(200)
            }, function (error)
            {
                console.log(error)
                res.sendStatus(404)
            })

   /*     return wordModel.createWord(word)
            .then (function (word) {
                console.log("inserted word");
                res.send(word);
                res.sendStatus(200)
            }, function (error) {
                console.log(error)
                res.sendStatus(404)
            })*/



    }

    function findAllWordsByDictionaryId(req, res) {
    /*    return wordModel.findAllWords()
            .then (function (words)
            {
                console.log("inserted word");
                res.send(words);
                res.sendStatus(200)
            }, function (error)
            {
                console.log(error)
                res.sendStatus(404)
            })*/

    var dictionaryId = req.params.dictionaryId;
    dictionaryModel
        .findAllWordsByDictionaryId(dictionaryId)
        .then(function (words)
        {
            res.json(words)
            console.log("elllo")


            res.sendStatus(200)
        }, function (error)
        {
            console.log(error);
        })

    }






};