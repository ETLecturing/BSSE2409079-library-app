const Transaction = require('../models/Transaction');
const Reservation = require('../models/Reservation');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

async function createReservation(req, res) {
    try {
        const memberId = new mongoose.Types.ObjectId(req.user.memberId);
        const bookId = new mongoose.Types.ObjectId(req.params.bookId);

        const isBookReserved = await Reservation.findOne({memberId: memberId, bookId: bookId});
        if(isBookReserved) {
            return res.status(409).json({ message: "Reservation exist!" });
        }

        const newReservation = await Reservation.create({
            memberId: memberId,
            bookId: bookId,
            type: 'reserve'
        });

        res.status(200).json({ message: "Reservation created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteReservation(req, res) {

}

async function createBooking(req, res) {
    try {
        const memberId = new mongoose.Types.ObjectId(req.user.memberId);
        const bookId = new mongoose.Types.ObjectId(req.params.bookId);
        const { period } = req.body

        const isBookBorrowed = await Booking.findOne({bookId: bookId});
        if(isBookBorrowed) {
            console.log('This book is out on loan.');
            return res.status(409).json({ message: "Book is borrowed." });
        }

        // later check if reserve date is the earliest, if no, then do not delete
        const isBookReserved = await Reservation.findOne({bookId: bookId});
        if (isBookReserved) {

            if (isBookReserved.memberId.equals(memberId)) {
                console.log('This book is reserved by you! Deleting reservation.');
                await Reservation.deleteOne(isBookReserved);

            } else {
                console.log('This book is not reserved by you!');
            }
        } else {
            console.log('This book is not reserved.');
        }

        // Date calculation
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + +period);

        const newBooking = await Booking.create({
            memberId: memberId,
            bookId: bookId,
            type: 'borrow',
            startDate: startDate,
            period: period,
            endDate: endDate,
            returnDate: null,
            overdueFee: 0
        });

        res.status(200).json({ message: "Record created." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteBooking(req, res) {
    // home-page
}

module.exports = { createReservation, createBooking };