'use strict';

module.exports = {
  ok(reply, value) {
    const r = reply(value);
    r.statusCode = 200;
    return r;
  },

  internalServerError(reply, message) {
    const r = reply('Internal Server Error: ' + message);
    r.statusCode = 500;
    return r;
  }
};
