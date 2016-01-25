'use strict';

const momentTimezone = require('moment-timezone');
const rp = require('request-promise');

function formatTime(dateTimeInSeconds) {
    const gmtDateTime = new Date(dateTimeInSeconds * 1000);
    const localDateTime = momentTimezone(gmtDateTime).tz('Europe/Budapest');
    return localDateTime.format('HH:mm');
}

module.exports = {
    get (stop, minutesAfter) {
        const result = {
            title: stop.title,
            subTitle: stop.subTitle,
            shortTitle: stop.shortTitle,
            currentTime: '',
            nextRides: [],
            shortNextRides: ''
        };

        const uri = `http://futar.bkk.hu/bkk-utvonaltervezo-api/ws/otp/api/where/arrivals-and-departures-for-stop.json?stopId=${stop.id}&onlyDepartures=true&minutesBefore=0&minutesAfter=${minutesAfter}`;

        const options = {
            method: 'GET',
            uri,
            resolveWithFullResponse: true,
            json: true
        };

        return rp(options)
            .then(function onGetSuccess (response) {
                if (response.statusCode !== 200) {
                    throw new Error(`The webservice returned with a HTTP status code different than 200: ${response.statusCode}`);
                }

                const body = response.body;

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

                const rides = body.data.entry.stopTimes;

                for (const ride of rides) {
                    const rideTimeInSeconds = ride.predictedArrivalTime || ride.arrivalTime || ride.departureTime;
                    const rideTimeString = formatTime(rideTimeInSeconds);
                    result.nextRides.push(rideTimeString);
                }

                result.shortNextRides = result.nextRides.join(', ');

                return result;
            });
    }
};
