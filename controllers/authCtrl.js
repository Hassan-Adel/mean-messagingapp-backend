//Models
var User = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment')

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
                response.status(200).send({token: createToken(result)});
            })
        });
    }
}

function createToken(user){
    var payload={
        sub:user._id,
        iat:moment().unix,                      //Issued  At Time
        exp: moment().add(14, 'days').unix()
    };
return jwt.encode(payload,'secret');
}
