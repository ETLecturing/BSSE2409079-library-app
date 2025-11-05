const Transaction = required('./Transaction.js');
const mongoose = require('mongoose');
const { Schema } = mongoose.Schema

const reservationSchema = new Schema({
    reservationDate: {
        type: Date,
        required: true
    }
});

const Reservation = Transaction.discriminator('reservation', reservationSchema);
module.exports = Reservation;