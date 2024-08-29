const express = require('express');
const Book = require('../models/book');
const Review = require('../models/review');

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get book by ISBN
router.get('/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get books by author
router.get('/author/:author', async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.author });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get books by title
router.get('/title/:title', async (req, res) => {
    try {
        const books = await Book.find({ title: req.params.title });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get reviews for a book
router.get('/:isbn/reviews', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn }).populate('reviews');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book.reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
