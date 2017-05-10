//Models
var User = require('../models/user');
var jwt = require('jwt-simple');
var momnet = require('moment')

module.exports = {
    register: function (request, response) {
        console.log(request.body);

        User.findOne({
            email: request.body.email
        }, function (error, existingUser) {

            if (existingUser)
                return response.status(409).send({
                    message: 'Email is already registered'
                });

            var user = new User(request.body);

            user.save(function (error, result) {
                if (error) {
                    response.status(500).send({
                        message: error.message
                    });
                }
                response.status(200).send({tokken: createTokken(result)});
            })
        });
    }
}

function createTokken(user){
    var payload={
        sub:user._id,
        iat:momnet().unix,                      //Issued  At Time
        exp: moment().add(14, 'days').unix()
    };
return jwt.encode(payload,'secret');
}
