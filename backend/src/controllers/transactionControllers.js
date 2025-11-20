const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Booking = require('../models/Booking');
const { updateBookStatus } = require('../utils/bookUpdater');

async function createReservation(req, res) {
    try {
        const memberId = new mongoose.Types.ObjectId(req.user.memberId);
        const bookId = new mongoose.Types.ObjectId(req.params.bookId);

        const existingReservation = await Reservation.findOne({memberId: memberId, bookId: bookId});

        if(existingReservation) {
            console.log(existingReservation);
            return res.status(409).json({ message: "You already reserved this book!" });
        } else {
            console.log('No reservation on this book.');
        }

        await Reservation.create({
            memberId,
            bookId,
            type: 'reserve'
        });

        updateBookStatus(bookId);

        res.status(201).json({ message: "Reservation created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update book availability
async function createBooking(req, res) {
    try {
        const memberId = new mongoose.Types.ObjectId(req.user.memberId);
        const bookId = new mongoose.Types.ObjectId(req.params.bookId);
        const { period } = req.body

        if (!period || isNaN(+period)) {
            return res.status(400).json({ message: "Invalid borrowing period." });
        }

        const existingBorrow = await Booking.findOne({ bookId });
        if(existingBorrow) {
            return res.status(409).json({ message: "Book is borrowed by someone else." });
        }

        const existingReservation = await Reservation.findOne({ bookId }).sort({ reservedDate: 1 });

        if(!existingReservation) {
            console.log('This book is not reserved. You may borrow it.');
        } else {
            if (!existingReservation.memberId.equals(memberId)) {
                return res.status(403).json({ message: "The book is reserved but it's not your turn." }); 
            } else {
                console.log('The reservation belongs to you! Updating now...');
                await Reservation.deleteOne({_id: existingReservation._id});
            }
        }
        
        // Date calculation
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + +period);

        // Booking creation
        await Booking.create({
            memberId,
            bookId,
            type: 'borrow',
            startDate,
            period: +period,
            endDate,
            returnDate: null,
            overdueFee: 0
        });

        updateBookStatus(bookId);

        res.status(201).json({ message: "Booking created." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteReservation(req, res) {
    // welcome back! let's work on this now
}

async function deleteBooking(req, res) {
    // home-page
}

async function getReservations(req, res) {
    const memberId = new mongoose.Types.ObjectId(req.user.memberId);

    try {
        const reservedBooks = await Reservation.find({memberId});
        console.log(reservedBooks);
        res.status(200).json(reservedBooks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getBookings(req, res) {
    const memberId = new mongoose.Types.ObjectId(req.user.memberId);

    try {
        const borrowedBooks = await Booking.find({memberId});
        console.log(borrowedBooks);
        res.status(200).json(borrowedBooks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createReservation, createBooking, getReservations, getBookings };