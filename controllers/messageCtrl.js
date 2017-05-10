//Models
var Message = require('../models/message');

module.exports = {
    get: function (request, response) {
        Message.find({}).exec(function (error, result) {
            response.send(result);
        })
    },
    post: function (request, response) {
        console.log(request.body, request.user);
        request.body.user = request.user;
        var message = new Message(request.body);
        message.save();
        response.status(200);
    }
}
