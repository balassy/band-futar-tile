'use strict';

const Controller = require('./controller');
const Service = require('./service');

const internals = {
  service: Service
};

internals.register = function register(server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler: Controller.get
  });

  next();
};

internals.register.attributes = {
  name: 'nextRide'
};

module.exports = internals;
