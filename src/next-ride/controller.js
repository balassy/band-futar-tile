'use strict';

let Service = require('./service');
let Rest = require('../utils/rest');

module.exports = {
    get: function (request, reply) {
        let stopId = 'BKK_F02296';
        let minutesAfter = 30;

        Service.get(stopId, minutesAfter)
            .then(function (result) {
                Rest.ok(reply, result);
            })
            .catch(function (err) {
                Rest.internalServerError(reply, err);
            })
    }
};