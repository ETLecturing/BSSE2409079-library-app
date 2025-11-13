const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookControllers');

router.post('/api/add', bookControllers.addBook);
router.get('/api/getAll', bookControllers.getAllBooks);
router.get('/api/getOne/:id', bookControllers.getOneBook);

module.exports = router;