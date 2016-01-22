'use strict';

let Promise = require('bluebird');
let Service = require('./service');
let Rest = require('../utils/rest');

module.exports = {
    get: function (request, reply) {
        let minutesAfter = 30;
        
        let stops = [
            {
                id: 'BKK_F02296',
                title: `59 villamos`,
                subTitle: 'Vas G. u. -> Széll K. tér',
                shortTitle: '59 (Vas G.)'              
            },
            {
                id: 'BKK_F02294',
                title: `105 busz`,
                subTitle: 'Apor V. tér -> Gyöngyösi u.',
                shortTitle: '105 (Apor V.)'              
            },
            {
                id: 'BKK_F00945',
                title: `105 busz`,
                subTitle: 'Bajcsy-Zs. út -> Apor V. tér',
                shortTitle: '105 (Bajcsy-Zs.)'             
            }                         
        ];

        Promise.map(stops, function (stop) {
            return Service.get(stop, minutesAfter);
        })
            .then(function (stopResults) {
                Rest.ok(reply, stopResults);
            })
            .catch(function (err) {
                Rest.internalServerError(reply, err);
            });
    }
};