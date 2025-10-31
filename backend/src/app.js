const cors = require('cors');
const express = require('express')

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Express application!');
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

//app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;