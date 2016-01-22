var Service = require('./service');
var Rest = require('../utils/rest');

module.exports = {
    get: function (request, reply) {
        var resultData = Service.get();
        Rest.ok(reply, resultData);         
    }
};