const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookControllers');

router.post('/api/add', bookControllers.addBook);
router.get('/api/getAll', bookControllers.getAllBooks);

module.exports = router;