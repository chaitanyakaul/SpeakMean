module.exports = function (app, dictionaryModel) {
    app.post('/api/Dictionary', createDictionary);
    app.get('/api/Dictionary', findAllDictionaries);
    app.get('/api/Dictionary/:DictionaryId', findDictionaryById);
    app.put('/api/Dictionary/:DictionaryId', updateDictionary);
    //app.delete('/api/Dictionary/:DictionaryId', deleteDictionary);

    //
    // var dictionaries = [
    //     {_id: '123', name: 'Dictionary 123', vocabulary: ['Word123-1', 'Word123-2', 'Word123-3', 'Word123-4'], topics: ['Topic 123-1', 'Topic 123-2', 'Topic 123-3', 'Topic 123-4']},
    //     {_id: '234', name: 'Dictionary 234', vocabulary: ['Word234-1', 'Word234-2', 'Word234-3', 'Word234-4'], topics: ['Topic 234-1', 'Topic 234-2', 'Topic 234-3', 'Topic 234-4']},
    //     {_id: '345', name: 'Dictionary 345', vocabulary: ['Word345-1', 'Word345-2', 'Word345-3', 'Word345-4'], topics: ['Topic 345-1', 'Topic 345-2', 'Topic 345-3', 'Topic 345-4']},
    //     {_id: '456', name: 'Dictionary 456', vocabulary: ['Word456-1', 'Word456-2', 'Word456-3', 'Word456-4'], topics: ['Topic 456-1', 'Topic 456-2', 'Topic 456-3', 'Topic 456-4']}
    // ];


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
                console.log("inserted dictionary");
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



 /*       for(var i in Dictionarys) {
            var Dictionary = Dictionarys[i];
            if(DictionaryId === Dictionary._id) {
                Dictionarys[i] = Dictionary;
=======
    function createDictionary(req, res) {
        var dictionary = req.body;
        dictionary._id = (new Date()).getTime();
        dictionaries.push(dictionary);
        req.sendStatus(200);
    }

    function findAllDictionaries(req, res) {
        console.log("Here");
        res.json(dictionaries);
    }

    function findDictionaryById(req, res) {
        var dictionaryId = req.params.dictioanryId;
        for(var i in dictionaries) {
            var dictionary = dictionaries[i];
            if(dictionaryId === dictionary._id) {
                res.json(dictionary);
                return;
            }
        }
        res.sendStatus(404).send('Dictionary not found');
    }

    function updateDictionary(req, res) {
        var dictionaryId = req.params.dictionaryId;
        var dictionary = req.body;
        for(var i in dictionaries) {
            var dictionary = dictionaries[i];
            if(dictionaryId === dictionary._id) {
                dictionaries[i] = dictionary;
>>>>>>> 3ec63643e24509302367ed67bf7699931bcc6763
                res.sendStatus(200);
                return;
            }
        }
<<<<<<< HEAD
        res.sendStatus(404).send('Dictionary not found');*/
    }
/*
    function deleteDictionary(req, res) {
        var DictionaryId = req.params.DictionaryId;
        for(var i in Dictionarys) {
            var Dictionary = Dictionarys[i];
            if (DictionaryId === Dictionary._id) {
                Dictionarys.splice(i, 1);

                res.sendStatus(404).send('dictionary not found');
            }

        }}*/
};