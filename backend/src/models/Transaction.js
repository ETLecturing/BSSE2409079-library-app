const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    book: {
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