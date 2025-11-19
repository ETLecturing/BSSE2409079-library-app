const express = require('express');
const router = express.Router();
const transactionControllers = require('../controllers/transactionControllers');
const { authenticateToken } = require('../middleware/auth');

router.post('/api/reserve/:bookId', authenticateToken, transactionControllers.createReservation);
router.post('/api/borrow/:bookId', authenticateToken, transactionControllers.createBooking);

module.exports = router;