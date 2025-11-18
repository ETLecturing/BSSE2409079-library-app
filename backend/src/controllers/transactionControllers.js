const Transaction = require('../models/Transaction');
const Reservation = require('../models/Reservation');
const Booking = require('../models/Booking');

async function createReservation(req, res) {
    // get today's date
    // create a Reservation of the book, enum 'reserve'
    try {
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteReservation(req, res) {
    // un-reserve a book
}

async function createBooking(req, res) {
    // create booking
    // certain values are null
}

async function deleteBooking(req, res) {
    // home-page
}

module.exports = { createReservation, createBooking };