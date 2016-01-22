var Controller = require('./controller');
var Service = require('./service');

var internals = {
    service: Service
};

internals.register = function (server, options, next) {
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