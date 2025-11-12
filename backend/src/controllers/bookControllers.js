const bcryptor = require('../utils/bcryptor');
const Book = require('../models/Book');

async function addBook(req, res) {
    const {title, author, publisher, year, genre, language, imgUrl, status} = req.body;

    try {
        const newBook = await Book.create({
            title: title, 
            author: author, 
            publisher: publisher,
            year: year,
            genre: genre,
            language: language,
            imgUrl: imgUrl,
            status: status
        });

        console.log(newBook);
        
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

module.exports = { addBook, getAllBooks };