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

app.post('/api/registerUser', (req, res) => {

  createMember(req.body.username, req.body.email, req.body.password);

  res.json('Data received! Saving data...', req.body);
});

// dev
const Member = require('./models/Member');

async function createMember(username, email, password) {
  const newMember = await Member.create({
    name: username,
    email: email,
    password_hash: password
  });

  await newMember.save();
  console.log('New Member created and saved:', newMember);
}

app.get('/', (req, res) => {
  // createMember();
  // console.log(mongoose.connection.name);
  res.send('Welcome to the Express application!');
});


module.exports = app;