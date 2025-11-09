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

app.post('/api/loginUser', async (req, res) => {
  try {
    const member = await Member.findOne({email: req.body.email});

    if(member){
      console.log('Member exists!');
    } else {
      console.log('Member does not exist!');
    }

  } catch(err) {
    console.log(err);
  }

  res.json('Data received! Saving data...', req.body);
});

// dev
app.use('/member', require('./routes/memberRoutes'));


module.exports = app;