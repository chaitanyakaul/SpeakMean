module.exports = function (app,languageModel) {
    app.post('/api/language', createLanguage);
    app.get('/api/language', findAllLanguages);
    app.get('/api/language/:languageId', findLanguageById);
    app.put('/api/language/:languageId', updateLanguage);
    app.delete('/api/language/:languageId', deleteLanguage);

    // var languages = [
    //     {_id: '123', name: 'English', regions: ['English Region 1', 'English Region 2', 'English Region 3'], countries: ['English Country 1', 'English Country 2', 'English Country 3']},
    //     {_id: '234', name: 'Spanish', regions: ['Spanish Region 1', 'Spanish Region 2', 'Spanish Region 3'], countries: ['Spanish Country 1', 'Spanish Country 2', 'Spanish Country 3']},
    //     {_id: '345', name: 'German', regions: ['German Region 1', 'German Region 2', 'German Region 3'], countries: ['German Country 1', 'German Country 2', 'German Country 3']},
    //     {_id: '456', name: 'Italian', regions: ['Italian Region 1', 'Italian Region 2', 'Italian Region 3'], countries: ['Italian Country 1', 'Italian Country 2', 'Italian Country 3']},
    // ];

    function createLanguage(req, res) {
        var language = req.body;
        languageModel
            .createLanguage(language)
            .then(function (language) {
                console.log(language)
                res.json(language)
            },function (err) {
                res.send(err)
            })
        // language._id = (new Date()).getTime();
        // languages.push(language);
        // req.sendStatus(200);
    }

    function findAllLanguages(req, res) {
        languageModel
            .findAllLanguages()
            .then(function (languages) {
                res.json(languages)
            },function (err) {
                res.send(err)
            })
    }

    function findLanguageById(req, res) {
        var languageId = req.params.languageId;
        languageModel
            .findLanguageById(languageId)
            .then(function (language) {
                if (language.length==0){
                    res.sendStatus(404).send('language Not Found!')
                }else{
                    res.json(language)
                }
            },function (err) {
                res.send(err)
            })
        // var language = languages.filter(function(language){
        //     return language._id === languageId;
        // });
        // console.log(language);
        // if (language) {
        //     res.json(language);
        //     console.log('found');
        //     console.log(language);
        //     return;
        // }
        // for(var i in languages) {
        //     var language = languages[i];
        //     if(languageId === language._id) {
        //         res.json(language);
        //         return;
        //     }
        // }
        // res.sendStatus(404).send('language not found');
    }

    function updateLanguage(req, res) {
        var languageId = req.params.languageId;
        var language = req.body;
        languageModel
            .updateLanguage(languageId,language)
            .then(function (status) {
                res.sendStatus(200)
            },function (err) {
                res.send(err)
            })
        // for(var i in languages) {
        //     if(languageId === languages[i]._id) {
        //         languages[i] = language;
        //         res.json(languages[i]);
        //         return;
        //     }
        // }
        // res.sendStatus(404).send('language not found');
    }

    function deleteLanguage(req, res) {
        var languageId = req.params.languageId;

        languageModel
            .deleteLanguage(languageId)
            .then(function (status) {
                res.sendStatus(200)
            },function (err) {
                res.sendStatus(404).send('Sorry Could not delete.')
                res.send(err)
            })
        // for(var i in languages) {
        //     var language = languages[i];
        //     if(languageId === language._id) {
        //         languages.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404).send('language not found');
    }
};