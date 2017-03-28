module.exports = function () {
    var mongoose = require('mongoose');

    var transcriptSchema=mongoose.Schema({
        twilioTranscriptId: String,
        transcriptText: String,
        creates: {
            type: Date,
            default: Date.now
        }
    });

    return transcriptSchema;
};
