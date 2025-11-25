const cors = require('cors');
const express = require('express')

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Express application!');
});


// Routes
app.use('/member', require('./routes/memberRoutes'));
app.use('/book', require('./routes/bookRoutes'));
app.use('/transaction', require('./routes/transactionRoutes'));

module.exports = app;