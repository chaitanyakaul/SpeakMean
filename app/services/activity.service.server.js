module.exports = function (app) {
    app.get('/api/activity',  findAllActivities);

    var activities = [
        {username: {_id: '123', first: "Larry", avatarImage: "", city: 'Paris'}, language: 'French', minutes: '20'},
        {username: {_id: '234', first: "Flinn", avatarImage: "", city: 'Spain'}, language: 'Spanish', minutes: '30'},
        {username: {_id: '345', first: "Daniel", avatarImage: "", city: 'UK'}, language: 'English', minutes: '40'},
        {username: {_id: '456', first: "Aviva", avatarImage: "", city: 'Italy'}, language: 'Italian', minutes: '10'},
        {username: {_id: '567', first: "Brayo", avatarImage: "", city: 'Brasil'}, language: 'Potuguese', minutes: '20'},
        {username: {_id: '678', first: "Alice", avatarImage: "", city: 'Poland'}, language: 'Polish', minutes: '30'},
        {username: {_id: '789', first: "Bob", avatarImage: "", city: 'Russia'}, language: 'Russian', minutes: '40'},
        {username: {_id: '889', first: "Bob1", avatarImage: "", city: 'Russia'}, language: 'Russian', minutes: '40'},
        {username: {_id: '989', first: "Bob2", avatarImage: "", city: 'Russia'}, language: 'Russian', minutes: '40'},
        {username: {_id: '089', first: "Bob3", avatarImage: "", city: 'Russia'}, language: 'Russian', minutes: '40'}
    ];

    function findAllActivities(req, res) {
        res.json(activities);
    }
};