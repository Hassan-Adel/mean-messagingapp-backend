var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//Allow CORS(Cross Origin Resource Sharing)
app.use(function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.post('/api/message', function(request,response){
    console.log(request.body);
    response.status(200);
})

var server = app.listen(5000, function(){
    console.log('listing on port ',server.address().port);
})
