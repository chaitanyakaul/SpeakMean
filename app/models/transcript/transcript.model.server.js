module.exports = function () {
    var q = require('q');
    var api = {
        findTranscriptById: findTranscriptById
    };

    var mongoose = require('mongoose');
    var TranscriptSchema = require('./transcript.schema.server')();
    var TranscriptModel = mongoose.model('TranscriptModel', TranscriptSchema);

    return api;

    var transcriptMock = {text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'};

    function findTranscriptById(transcriptId) {
        console.log(transcriptId);
        var id = mongoose.Types.ObjectId();
        var deferred = q.defer();
        TranscriptModel
            .findById(id, function (err, transcript) {
                console.log('=====');
                console.log(err);
                console.log(transcript);
                if(err) {
                    return err;
                } else {
                    deferred.resolve(transcriptMock);
                }
        });
        return deferred.promise;
    }
};