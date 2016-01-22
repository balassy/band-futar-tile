'use strict';

let MomentTimezone = require('moment-timezone');
let RP = require('request-promise');

function formatTime(dateTimeInSeconds) {
    let gmtDateTime = new Date(dateTimeInSeconds * 1000);
    let localDateTime = MomentTimezone(gmtDateTime).tz('Europe/Budapest');
    return localDateTime.format('HH:mm');
}

module.exports = {
    get: function (stopId, minutesAfter) {
        let now = formatTime(Date.now() / 1000);

        let result = {
            name: '59 villamos',
            description: 'Vas Gereben utca -> Széll Kálmán tér',
            now: now,
            nextRides: [],
            shortTite: `59 villamos ${now} után`,
            shortSubTitle: 'Vas G. u. -> Széll K. tér',
            shortNextRides: ''
        };

        let uri = `http://futar.bkk.hu/bkk-utvonaltervezo-api/ws/otp/api/where/arrivals-and-departures-for-stop.json?stopId=${stopId}&onlyDepartures=true&minutesBefore=0&minutesAfter=${minutesAfter}`;

        let options = {
            method: 'GET',
            uri: uri,
            resolveWithFullResponse: true,
            json: true
        };

        return RP(options)
            .then(function (response) {
                console.log(response);
                if (response.statusCode !== 200) {
                    throw new Error(`The webservice returned with a HTTP status code different than 200: ${response.statusCode}`);
                }

                let body = response.body;

                if (body.version !== 2) {
                    throw new Error(`The webservice returned a response body with a version different than 2: ${body.version}`);
                }

                if (body.status !== 'OK') {
                    throw new Error(`The webservice returned a response body with a status different than OK: ${body.status}`);
                }

                if (body.code !== 200) {
                    throw new Error(`The webservice returned a response body with a code different than 200: ${body.code}`);
                }

                let rides = body.data.entry.stopTimes;

                for (let ride of rides) {
                    let arrivalTimeInSeconds = ride.predictedArrivalTime || ride.arrivalTime;
                    let arrivalTimeString = formatTime(arrivalTimeInSeconds);
                    result.nextRides.push(arrivalTimeString);
                }

                result.shortNextRides = result.nextRides.join(', ');
                
                return result;
            });
    }
};