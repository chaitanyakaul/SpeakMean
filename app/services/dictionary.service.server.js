module.exports = function (app, dictionaryModel) {
    app.post('/api/Dictionary', createDictionary);
    app.post('/api/dictionary/:dictionaryId/word', updateWords);
    app.get('/api/Dictionary', findAllDictionaries);
    app.get('/api/Dictionary/:DictionaryId', findDictionaryById);
    app.put('/api/Dictionary/:DictionaryId', updateDictionary);
    app.delete('/api/Dictionary/:DictionaryId', deleteDictionary);
    app.post('/api/Dictionary/:DictionaryId', addWordList);


    //
    // var dictionaries = [
    //     {_id: '123', name: 'Dictionary 123', vocabulary: ['Word123-1', 'Word123-2', 'Word123-3', 'Word123-4'], topics: ['Topic 123-1', 'Topic 123-2', 'Topic 123-3', 'Topic 123-4']},
    //     {_id: '234', name: 'Dictionary 234', vocabulary: ['Word234-1', 'Word234-2', 'Word234-3', 'Word234-4'], topics: ['Topic 234-1', 'Topic 234-2', 'Topic 234-3', 'Topic 234-4']},
    //     {_id: '345', name: 'Dictionary 345', vocabulary: ['Word345-1', 'Word345-2', 'Word345-3', 'Word345-4'], topics: ['Topic 345-1', 'Topic 345-2', 'Topic 345-3', 'Topic 345-4']},
    //     {_id: '456', name: 'Dictionary 456', vocabulary: ['Word456-1', 'Word456-2', 'Word456-3', 'Word456-4'], topics: ['Topic 456-1', 'Topic 456-2', 'Topic 456-3', 'Topic 456-4']}
    // ];

    function updateWords(req, res) {
        dictionaryModel
            .updateWords(req.params.dictionaryId, req.body.words)
            .then(
                function (response) {
                    res.sendStatus(200).send(response);
                },function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }
    
    function addWordList(req,res) {
        var list=req.body;
        var DictionaryId = req.params.DictionaryId;
        dictionaryModel
            .addWordList(list,DictionaryId)
            .then(
                function (response) {
                    res.sendStatus(200).send(response);
                },function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }
    function createDictionary(req, res) {
        var dictionary = req.body;
        console.log("server dic")

        return dictionaryModel.createDictionary(dictionary)
            .then (function (dictionary) {
                console.log("inserted dictionary");
                res.send(dictionary);
                res.sendStatus(200)
            }, function (error) {
                console.log(error)
                res.sendStatus(404)
            })
    }

    function findAllDictionaries(req, res) {
        return dictionaryModel.findAllDictionaries()
            .then (function (dictionaries)
            {
                res.send(dictionaries);
                res.sendStatus(200)
            }, function (error)
            {
                console.log(error)
                res.sendStatus(404)
            })
    }

    function findDictionaryById(req, res) {
        var DictionaryId = req.params.DictionaryId;
        console.log("dictoinaryFIND");
        console.log(DictionaryId);
        return dictionaryModel.findDictionaryById(DictionaryId)
            .then (function (dictionary)
            {
                console.log("hit in findbyid");



                res.json(dictionary)
                res.sendStatus(200)
            }, function (error)
            {
                console.log(error)
                res.sendStatus(404)
            })

        // for(var i in Dictionarys) {
        //     var Dictionary = Dictionarys[i];
        //     if(DictionaryId === Dictionary._id) {
        //         res.json(Dictionary);
        //         return;
        //     }
        // }
        // res.sendStatus(404).send('Dictionary not found');
    }


    function deleteDictionary(req, res)
    {
        var DictionaryId = req.params.DictionaryId
        console.log(DictionaryId);
        console.log("printing")
        return dictionaryModel.deleteDictionary(DictionaryId)
            .then(function (response)
            {
                res.sendStatus(200)
            }, function (error)
            {
                console.log(error)
                res.sendStatus(404)
            })
    }
    
    function updateDictionary(req, res) {
        var DictionaryId = req.params.DictionaryId;
        var Dictionary = req.body;
        return dictionaryModel.updateDictionary(DictionaryId, Dictionary)
            .then (function (dictionary)
            {
                res.sendStatus(200)
            }, function (error)
            {
                console.log(error)
                res.sendStatus(404)
            })

        }
};