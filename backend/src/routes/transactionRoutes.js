const express = require('express');
const router = express.Router();
const transactionControllers = require('../controllers/transactionControllers');
const { authenticateToken } = require('../middleware/auth');

router.post('/api/reserve/:bookId', authenticateToken, transactionControllers.createReservation);
router.post('/api/borrow/:bookId', authenticateToken, transactionControllers.createBooking);

router.get('/api/getReservations', authenticateToken, transactionControllers.getReservations);
router.get('/api/getBookings', authenticateToken, transactionControllers.getBookings);

router.post('/api/deleteReservation/:bookId', authenticateToken, transactionControllers.deleteReservation);
router.post('/api/deleteBooking/:bookId', authenticateToken, transactionControllers.deleteBooking);

module.exports = router;