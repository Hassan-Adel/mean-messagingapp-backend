//Allow CORS(Cross Origin Resource Sharing)
module.exports = function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
}
