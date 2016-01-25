'use strict';

const path = require('path');
const gulp = require('gulp');
const urbanjs = require('urbanjs-tools');

// Disable some UrbanJS features not used in this project.
urbanjs.initialize(gulp, {
  eslint: {
    configFile: path.join(__dirname, './.eslintrc')
  },
  jest: false,
  jsdoc: false,
  webpack: false
});

// Although UrbanJS provides a default 'pre-commit' task, it is overridden here to remove the 'test' subtask from it.
gulp.task('pre-commit', ['analyse']);
