module.exports = function (app,TranscriptModel) {
    app.get('/api/transcript/:transcriptId',findTranscriptById);

    function findTranscriptById(req,res) {
        var transcriptId=req.params.transcriptId;
        console.log(transcriptId);
        TranscriptModel
            .findTranscriptById(transcriptId)
            .then(
                function (transcript) {
                    console.log("Service"+transcript);
                    res.json(transcript);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};