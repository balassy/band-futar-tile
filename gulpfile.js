'use strict';

const gulp = require('gulp');
const urbanjs = require('urbanjs-tools');

// Disable some UrbanJS features not used in this project.
urbanjs.initialize(gulp, {
  jest: false,
  jsdoc: false,
  retire: false,
  webpack: false
});
