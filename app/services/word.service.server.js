/**
 * Created by chaitanyakaul on 25/03/17.
 */
module.exports = function (app, dictionaryModel) {
    app.post('/api/dictionary/:dictionaryId/word', createWord);
    app.get('/api/dictionary/:dictionaryId/word/', findAllWordsByDictionaryId);
    app.delete('/api/dictionary/:dictionaryId/word/:word', deleteWordFromDictionary);
    app.put('/api/dictionary/:dictionaryId/word/:word/word_new/:word_new', updateWord);

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


    function updateWord(req, res)
    {
        var word = req.params.word;
        var dictionaryId = req.params.dictionaryId;
        var word_new = req.params.word_new;

        return dictionaryModel
            .deleteWordFromDictionary(dictionaryId, word)
            .then (function (response)
            {

                dictionaryModel
                    .createWordFromCallBack(dictionaryId, word_new)
                    .then(function (response)
                    {
                        console.log(response);
                        res.sendStatus(200)
                    }, function (error)
                    {
                        console.log(error)
                        res.sendStatus(404)
                    })

                res.sendStatus(200)
            }, function (error)
            {
                console.log(error)
                res.sendStatus(404)
            })
    }

    function deleteWordFromDictionary(req, res) {
        var word = req.params.word;;
        var dictionaryId = req.params.dictionaryId;


        return dictionaryModel
            .deleteWordFromDictionary(dictionaryId, word)
            .then(function (response)
            {
                res.sendStatus(200)

            }, function (error)
            {
                console.log(error)
                res.sendStatus(404)

            })

    /*    return dictionaryModel
            .createWord(dictionaryId, word)
            .then(function (response) {
                console.log("inserted")
                res.sendStatus(200)
            }, function (error) {
                console.log(error)
                res.sendStatus(404)
            })*/
    }

    function findAllWordsByDictionaryId(req, res) {

    var dictionaryId = req.params.dictionaryId;
    dictionaryModel
        .findAllWordsByDictionaryId(dictionaryId)
        .then(function (words)
        {
            res.json(words)

            res.sendStatus(200)
        }, function (error)
        {
            console.log(error);
        })

    }









};