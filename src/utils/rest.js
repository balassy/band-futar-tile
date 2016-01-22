module.exports = {
    ok: function (reply, value) {
        var r = reply(value);
        r.statusCode = 200;
        return r;
    }
};