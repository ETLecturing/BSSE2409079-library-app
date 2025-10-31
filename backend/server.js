require('dotenv').config();
const { connectDB, getDB } = require('./src/configs/db');
const http = require('http');
const app = require('./src/app');

const { hashPassword, verifyPassword } = require('./src/utils/bcryptor');

const hostname = '0.0.0.0'
const port = process.env.PORT || 3000;

async function password_test() {
    const password = 'test123';
    const password_hash = await hashPassword(password);

    console.log('Login with password: test123: ', await verifyPassword('test123', password_hash));
    console.log('Login with password: wrong123: ', await verifyPassword('wrong123', password_hash));
}

password_test();

(async () => {
    await connectDB();

    const server = http.createServer(app);

    server.listen(port, hostname, function() {
        console.log(`Server listening on http://${hostname}:${port}/`);
    })

})();