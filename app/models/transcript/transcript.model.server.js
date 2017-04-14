module.exports = function () {
    var q = require('q');
    var api = {
        findTranscriptById: findTranscriptById
    };

    var mongoose = require('mongoose');
    var TranscriptSchema = require('./transcript.schema.server')();
    var TranscriptModel = mongoose.model('TranscriptModel', TranscriptSchema);

    var SessionModel = require('../session/session.model.server');
    var ModuleModel = require('../module/module.model.server');

    return api;

    var transcriptMock = {text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'};

    function findTranscriptById(transcriptId) {
        console.log(transcriptId);
        var id = mongoose.Types.ObjectId();
        var deferred = q.defer();
        SessionModel
            .findSessionById(transcriptId)
            .then(function (session) {
                return ModuleModel
                    .findModuleById(session.module)
            })
            .then(function (module) {
                module = module[0];
                console.log('[123]');
                console.log(module);
                var vocabulary = module.vocabulary;
                console.log(module.vocabulary);
                console.log(vocabulary);
                vocabulary = vocabulary.concat(module.topics);
                console.log(vocabulary);
                //.concat(module.topics);
                var text = vocabulary.join(' ');
                console.log(text);
                console.log('[234]');
                deferred.resolve({text: text});
            });
        // TranscriptModel
        //     .findById(id, function (err, transcript) {
        //         console.log('=====');
        //         console.log(err);
        //         console.log(transcript);
        //         if(err) {
        //             return err;
        //         } else {
        //             deferred.resolve(transcriptMock);
        //         }
        // });
        return deferred.promise;
    }
};