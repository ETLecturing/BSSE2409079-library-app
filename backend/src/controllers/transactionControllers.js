const Transaction = require('../models/Transaction');
const Reservation = require('../models/Reservation');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

async function createReservation(req, res) {
    try {
        const memberId = new mongoose.Types.ObjectId(req.user.memberId);
        const bookId = new mongoose.Types.ObjectId(req.params.bookId);

        // find, if have, button change to Un-Reserve

        const newReservation = await Reservation.create({
            memberId: memberId,
            bookId: bookId,
            type: 'reserve'
        });

        console.log(newReservation);

        res.status(200).json({ message: "Test" });
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
    try {
        const memberId = new mongoose.Types.ObjectId(req.user.memberId);
        const bookId = new mongoose.Types.ObjectId(req.params.bookId);

        // find, if have, button change to Un-Reserve

        const newReservation = await Reservation.create({
            memberId: memberId,
            bookId: bookId,
            type: 'borrow',
            startDate: "",
            period: "",
            endDate: "",
            returnDate: null,
            overdueFee: 0
        });

        console.log(newReservation);

        res.status(200).json({ message: "Test" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteBooking(req, res) {
    // home-page
}

module.exports = { createReservation, createBooking };