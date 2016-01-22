var Hapi = require('hapi');
var Glue = require('glue');
var Manifest = require('./manifest');
var Package = require('../package.json');

var options = {
    relativeTo: process.cwd()
};

Glue.compose(Manifest, options, function (err, server) {
    if (err) {
        console.error('Failed to configure the Hapi server: ', err);
        throw err;
    }
    else {
        server.start(function () {
            console.info(`Hapi server for ${Package.name} started at ${server.info.uri}.`)
        });
    }
});