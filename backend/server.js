let http = require("http");
let port = 3000;


let server = http.createServer(function(request, response) {
    response.setHeader("Content-Type", "text/plain");
    response.writeHead(200);

    response.write("Hello World." + "\n");

    response.end("Hi.");
});


server.listen(port, function() {
    console.log("Server listening on port " + port);
});