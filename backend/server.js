require('dotenv').config();
const { connectDB, getDB } = require('./src/configs/db');
const http = require('http');

const hostname = '0.0.0.0'
const port = process.env.PORT || 3000;

(async () => {
    await connectDB();

    const server = http.createServer(function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);

        res.write('Hello from inside the docker container!\n');
        res.end(`MongoDB connected! Database in use: ${getDB().databaseName}`);
    });

    server.listen(port, hostname, function() {
        console.log(`Server listening on http://${hostname}:${port}/`);
    })

})();