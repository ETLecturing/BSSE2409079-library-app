const Book = require('../models/Book');
const Reservation = require('../models/Reservation');
const Booking = require('../models/Booking');

async function updateBookStatus(bookId) {

    const borrow = await Booking.findOne({ bookId, returnDate: null });
    if (borrow) {
        await Book.updateOne({ _id: bookId }, { status: 'borrowed' });
        console.log('book status changed to borrowed');
        return;
    }

    const reservation = await Reservation.findOne({ bookId });
    if (reservation) {
        await Book.updateOne({ _id: bookId }, { status: 'reserved' });
        console.log('book status changed to reserved');
        return;
    }

    await Book.updateOne({ _id: bookId }, { status: 'available' });
}

module.exports = { updateBookStatus };