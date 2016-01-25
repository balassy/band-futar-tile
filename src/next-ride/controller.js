'use strict';

const Promise = require('bluebird');
const Service = require('./service');
const Rest = require('../utils/rest');

module.exports = {
  get(request, reply) {
    const minutesAfter = 90;

    const stops = [
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

    Promise.map(stops, function onPromiseMap(stop) {
      return Service.get(stop, minutesAfter);
    })
      .then(function onServiceCallsSuccess(stopResults) {
        Rest.ok(reply, stopResults);
      })
      .catch(function onServiceCallsFail(err) {
        Rest.internalServerError(reply, err);
      });
  }
};
