'use strict';

let MomentTimezone = require('moment-timezone');
let Service = require('./service');
let Rest = require('../utils/rest');

function formatTime(dateTimeInSeconds) {
    let gmtDateTime = new Date(dateTimeInSeconds * 1000);
    let localDateTime = MomentTimezone(gmtDateTime).tz('Europe/Budapest');
    return localDateTime.format('HH:mm');
}

module.exports = {
    get: function (request, reply) {
        let stopId = 'BKK_F02296';
        let minutesAfter = 30;
        let result = {
            name: '59 villamos',
            description: 'Vas Gereben utca -> Széll Kálmán tér',
            now: formatTime(Date.now() / 1000),
            nextRides: []
        };

        Service.get(stopId, minutesAfter)
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

                let rides = body.data.entry.stopTimes;

                for (let ride of rides) {
                    let arrivalTimeInSeconds = ride.predictedArrivalTime || ride.arrivalTime;
                    let arrivalTimeString = formatTime(arrivalTimeInSeconds);
                    result.nextRides.push(arrivalTimeString);
                }

                Rest.ok(reply, result);
            })
            .catch(function (err) {
                Rest.internalServerError(reply, err);
            })
    }
};