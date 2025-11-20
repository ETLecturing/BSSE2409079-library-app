const mongoose = require('mongoose');
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');
const Booking = require('../models/Booking');

async function addBook(req, res) {
    const {title, author, publisher, year, genre, language, imgUrl, status} = req.body;
    try {
        await Book.create({
            title: title, 
            author: author, 
            publisher: publisher,
            year: year,
            genre: genre,
            language: language,
            imgUrl: imgUrl,
            status: status
        });
        
        res.status(201).json({ message: 'Book added.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllBooks(req, res) {
    try {
        const allBooks = await Book.find();
        res.json(allBooks);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getOneBook(req, res) {
    const bookId = new mongoose.Types.ObjectId(req.params.id);

    try {
        const book = await Book.findOne({_id: bookId});
        res.status(200).json(book);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { addBook, getAllBooks, getOneBook };