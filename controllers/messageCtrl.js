//Models
var Message = require('../models/message');

module.exports = {
    get: function (request, response) {
        Message.find({}).exec(function (error, result) {
            response.send(result);
        })
    },
    post: function (request, response) {
        Message.find({}).exec(function (error, result) {
            response.send(result);
        })
    }
}
