const Book = require('../models/Book');
const Reservation = require('../models/Reservation');
const Booking = require('../models/Booking');

async function updateBookStatus(bookId) {
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error(`Book with _id: ${bookId} cannot be found.`);
        }

        const borrow = await Booking.findOne({ bookId, returnDate: null });
        if (borrow) {
            await Book.updateOne({ _id: bookId }, { status: 'borrowed' });
            return;
        }

        const reservation = await Reservation.findOne({ bookId });
        if (reservation) {
            await Book.updateOne({ _id: bookId }, { status: 'reserved' });
        }

        await Book.updateOne({ _id: bookId }, { status: 'available' });
        
    } catch (error) {
        console.log('Database error', error);
        throw error;
    }
}

module.exports = { updateBookStatus };