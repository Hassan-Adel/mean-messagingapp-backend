var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



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

//POST
app.post('/authentication/register', auth.register);

//GET
app.get('/api/message', message.get);

//POST
app.post('/api/message', message.post);

//DB Name = test
mongoose.connect('mongodb://localhost:27017/test', function (error, db) {
    if (!error) {
        console.log('we are connected to mongo');
    }
})

var server = app.listen(5000, function () {
    console.log('listing on port ', server.address().port);
})
