const Transaction = required('./Transaction.js');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    overdueFee: {
        type: Number
    }
});

const Booking = Transaction.discriminator('booking', bookingSchema);
module.exports = Booking;