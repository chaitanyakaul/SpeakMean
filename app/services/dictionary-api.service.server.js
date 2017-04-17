"use strict";

var q = require('q');

module.exports = function (app) {
    const https = require('https');
    const querystring = require('querystring');

    app.get('/api/oxford/query/language/:language/word/:word', searchQuery);
    app.get('/api/oxford/query/slanguage/:slang/tlanguage/:tlang/word/:word', translateQuery);

    var appId = process.env.OXFORD_APP_ID;
    var appKey = process.env.OXFORD_APP_KEY;
    var baseUrl = process.env.OXFORD_API_BASE_URL;

    console.log(appId);
    console.log(appKey);

    function searchQuery(req, res) {
        var word = req.params.word;
        var language = req.params.language;
        console.log("in server "+ language + " " + word);
        oxfordSearchQuery(language, word)
            .then(function(response){
                res.json(response);
            });
    }

    function oxfordSearchQuery(language, word) {
        var deferred = q.defer();
        https.get({
            host: 'od-api.oxforddictionaries.com',
            path: '/api/v1/search/'+language+'?q='+word+'&prefix=false&limit=10',
            headers: {
                "Accept": "application/json",
                "app_id": appId,
                "app_key": appKey
            }
        }, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                body = JSON.parse(body);
                deferred.resolve(body);
                // res.json(body);
            });
        });
        return deferred.promise;
    }

    function translateQuery(req, res) {
        var word = req.params.word;
        var slang = req.params.slang;
        var tlang = req.params.tlang;
        console.log("from "+ slang + " " + "to " + tlang + " " + word);
        oxfordSearchTranslate(slang, tlang, word)
            .then(function(response){
                res.json(response);
            });
    }

    function oxfordSearchTranslate(slang, tlang, word) {
        var deferred = q.defer();
        https.get({
            host: 'od-api.oxforddictionaries.com',
            path: '/api/v1/entries/'+slang+'/'+word+'/translations='+tlang,
            headers: {
                "Accept": "application/json",
                "app_id": appId,
                "app_key": appKey
            }
        }, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                body = JSON.parse(body);
                var trans = getTranslation(body.results[0].lexicalEntries);
                console.log(trans);
                deferred.resolve(trans);
                // res.json(body);
            });
        });
        return deferred.promise;
    }

  function getTranslation(lexicalEntries) {
        var trans = []
        for(var i in lexicalEntries)
        {
            var ent = lexicalEntries[i].entries;
            for(var l in ent)
            {
                var entry = ent[l].senses;
                for(var j in entry)
                {
                    if(entry[j].translations)
                    {
                        var translations = entry[j].translations;
                        for(var k in translations)
                        {
                            trans.push(translations[k].text);
                        }
                    }
                }
            }

        }
        return trans;
  }
};
