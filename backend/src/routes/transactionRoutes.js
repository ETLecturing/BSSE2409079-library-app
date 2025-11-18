const express = require('express');
const router = express.Router();
const transactionControllers = require('../controllers/transactionControllers');

router.post('/api/reserve', transactionControllers.createReservation);
router.post('/api/book', transactionControllers.createBooking);

module.exports = router;