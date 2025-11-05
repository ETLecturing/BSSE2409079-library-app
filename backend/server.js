require('dotenv').config();
const { connectDB } = require('./src/db');
const http = require('http');
const app = require('./src/app');

const hostname = '0.0.0.0'
const port = process.env.PORT || 3000;

(async () => {
    
    await connectDB();

    const server = http.createServer(app);

    server.listen(port, hostname, function() {
        console.log(`Server listening on http://${hostname}:${port}/`);
    })

})();