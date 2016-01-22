var rp = require('request-promise');

module.exports = {
    get: function (stopId, minutesAfter) {
        var uri = `http://futar.bkk.hu/bkk-utvonaltervezo-api/ws/otp/api/where/arrivals-and-departures-for-stop.json?stopId=${stopId}&onlyDepartures=true&minutesBefore=0&minutesAfter=${minutesAfter}`;
        
        var options = {
            method: 'GET',
            uri: uri,
            resolveWithFullResponse: true,
            json: true
        };

        return rp(options);
    }
};