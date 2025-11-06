const Transaction = required('./Transaction.js');
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservationDate: {
        type: Date,
        required: true
    }
});

const Reservation = Transaction.discriminator('reservation', reservationSchema);
module.exports = Reservation;