var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Message = mongoose.model('Message',{
   msg: String
});

app.use(bodyParser.json());

//Allow CORS(Cross Origin Resource Sharing)
app.use(function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.post('/api/message', function(request,response){
    console.log(request.body);

    var message = new Message(request.body);
    message.save();

    response.status(200);
})

function GetMessages(){
    Message.find({}).exec(function(error,result){
        console.log(result);
    })
}

//DB Name = test
mongoose.connect('mongodb://localhost:27017/test', function(error,db){
    if(!error){
        console.log('we are connected to mongo');
        GetMessages();
    }
})

var server = app.listen(5000, function(){
    console.log('listing on port ',server.address().port);
})
