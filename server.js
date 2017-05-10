var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');
//Why bluebird: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead:
mongoose.Promise = require('bluebird');


//Controllers
var auth = require('./controllers/authCtrl');
var message = require('./controllers/messageCtrl');

app.use(bodyParser.json());

//Allow CORS(Cross Origin Resource Sharing)
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

function checkAuthenticated(request, response, next){
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

//POST
app.post('/authentication/register', auth.register);

//GET
app.get('/api/message', message.get);

//POST
app.post('/api/message', checkAuthenticated, message.post);

//DB Name = test
mongoose.connect('mongodb://localhost:27017/test', function (error, db) {
    if (!error) {
        console.log('we are connected to mongo');
    }
})

var server = app.listen(5000, function () {
    console.log('listing on port ', server.address().port);
})
