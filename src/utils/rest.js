module.exports = {
    ok: function (reply, value) {
        var r = reply(value);
        r.statusCode = 200;
        return r;
    },
    
    internalServerError: function (reply, message) {
        var r = reply('Internal Server Error: ' + message);
        r.statusCode = 500;
        return r;
    }
};