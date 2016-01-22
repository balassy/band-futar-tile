'use strict';

let MomentTimezone = require('moment-timezone');
let RP = require('request-promise');

function formatTime(dateTimeInSeconds) {
    let gmtDateTime = new Date(dateTimeInSeconds * 1000);
    let localDateTime = MomentTimezone(gmtDateTime).tz('Europe/Budapest');
    return localDateTime.format('HH:mm');
}

module.exports = {
    get: function (stop, minutesAfter) {
        //let now = formatTime(Date.now() / 1000);        

        let result = {
            title: stop.title,
            subTitle: stop.subTitle,
            shortTitle: stop.shortTitle,
            currentTime: '',
            nextRides: [],
            shortNextRides: ''
        };

        let uri = `http://futar.bkk.hu/bkk-utvonaltervezo-api/ws/otp/api/where/arrivals-and-departures-for-stop.json?stopId=${stop.id}&onlyDepartures=true&minutesBefore=0&minutesAfter=${minutesAfter}`;

        let options = {
            method: 'GET',
            uri: uri,
            resolveWithFullResponse: true,
            json: true
        };

        return RP(options)
            .then(function (response) {
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

                result.currentTime = formatTime(body.currentTime / 1000);

                let rides = body.data.entry.stopTimes;

                for (let ride of rides) {
                    let rideTimeInSeconds = ride.predictedArrivalTime || ride.arrivalTime || ride.departureTime;
                    let rideTimeString = formatTime(rideTimeInSeconds);
                    result.nextRides.push(rideTimeString);
                }

                result.shortNextRides = result.nextRides.join(', ');

                return result;
            });
    }
};