const cors = require('cors');
const express = require('express')

const app = express();
app.use(cors());
app.use(express.json());

/*
app.get('/', (req, res) => {
  res.send('Welcome to the Express application!');
});
*/

// Example for angular
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

// dev
const Member = require('./models/Member')
const mongoose = require('mongoose');

async function createMember() {
  const newMember = await Member.create({
    name: 'John',
    email: 'john@abc.com',
    password_hash: 'abcdefghijklmnop'
  });

  await newMember.save();
  console.log('New Member created and saved:', newMember);
}

app.get('/', (req, res) => {
  createMember();
  console.log(mongoose.connection.name);
  res.send('Welcome to the Express application!');
});


module.exports = app;