const cors = require('cors');
const express = require('express')

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Express application!');
});



// Example for angular
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

// Routes
app.use('/member', require('./routes/memberRoutes'));
app.use('/book', require('./routes/bookRoutes'));

module.exports = app;