'use strict';

const path = require('path');
const Glue = require('glue');
const Manifest = require('./manifest');
const Package = require('../package.json');

const options = {
  relativeTo: path.join(process.cwd(), 'src')
};

Glue.compose(Manifest, options, function onGlueCompose(err, server) {
  if (err) {
    console.error('Failed to configure the Hapi server: ', err);  // eslint-disable-line no-console
    throw err;
  } else {
    server.start(function onHapiServerStart() {
      console.info(`Hapi server for ${Package.name} started at ${server.info.uri}.`);  // eslint-disable-line no-console
    });
  }
});
