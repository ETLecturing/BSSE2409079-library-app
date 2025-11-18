const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    type: {
        type: String,
        enum: ['reserve', 'borrow', 'return']
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;