var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function checkAuthenticated(request, response, next){
    if(!request.header('Authorization')){
        return response.status(401).send({message : 'Please make sure your request has an Authorization header'});
    }
    var token = request.header('Authorization').split(' ')[1];

    var payload = jwt.decode(token, 'secret');

    if(payload.exp <= moment().unix()){
        return response.status(401).send({message : 'Token has expired'});
    }

    //We will save the user id in the request itself so we can access in any conroller that uses our middleware by getting it through request.user
    request.user = payload.sub;

    next();
}
