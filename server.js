var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Why bluebird: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead:
mongoose.Promise = require('bluebird');


//Controllers
var auth = require('./controllers/authCtrl');
var message = require('./controllers/messageCtrl');

//Services
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//Middleware
app.use(bodyParser.json());
//Allow CORS(Cross Origin Resource Sharing)
app.use(cors)



//POST
app.post('/authentication/register', auth.register);

//POST
app.post('/authentication/login', auth.login);

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
