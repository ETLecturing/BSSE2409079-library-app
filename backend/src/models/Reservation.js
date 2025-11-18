const Transaction = require('./Transaction.js');
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Reservation = Transaction.discriminator('reservation', reservationSchema);
module.exports = Reservation;