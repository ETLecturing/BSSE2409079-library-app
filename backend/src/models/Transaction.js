const mongoose = require('mongoose');
const { Schema } = mongoose.Schema

const transactionSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    type: {
        type: String,
        enum: ['reserve', 'borrow', 'return']
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;