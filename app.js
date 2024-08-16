const express = require('express');
const connection = require('./database');
const mongoose = require('mongoose');
const cors = require('cors');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookTitle: { type: String, required: true},
    bookAuthor: { type: String, required: true},
    description: String,
});

const BookModel = mongoose.model("300387936-sangboak", BookSchema);

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/v1/book', async (req, res) => {
    const allBooks = await BookModel.find();

    res.json(allBooks);
})

app.get('/api/v1/book/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const book = await BookModel.findById(id);
        if (book == null) {
            res.status(404);
            return res.send("Not found");
        }

        res.json(book);
        return;
    } catch (error) {
        res.status(400);
        res.send("Something wrong!");
    }

})

app.post('/api/v1/book', async (req, res) => {

    try {
        const newBook = await BookModel.create({
            bookTitle: req.body.bookTitle,
            bookAuthor: req.body.bookAuthor,
            description: req.body.description
        });

        return res.json(newBook);
    } catch (e) {
        res.sendStatus(400);
        return;
    }
})

app.put('/api/v1/book/:id', async (req, res) => {
    const id = req.params.id;

    const book = await BookModel.findById(id);
    

    if (book == null) {
        res.status(404);
        res.send("Not found");
    } else {
        if (req.body.bookTitle) {
            book.bookTitle = req.body.bookTitle;
        }

        if (req.body.bookAuthor) {
            book.bookAuthor = req.body.bookAuthor;
        }

        if (req.body.description) {
            book.description = req.body.description;
        }

        await book.save();

        res.json(book);
    }

})

app.delete('/api/v1/book/:id', async (req, res) => {
    const id = req.params.id;

    const deleted = await BookModel.findByIdAndDelete(id);
    if (deleted) {
        res.status(200);
        res.send("Deleted");
    } else {
        res.status(404);
        res.send("Not Found");
    }
})

connection()
    .then(() => {
        app.listen(5000, () => {
            console.log("Server is running on 5000");
        })
    })
    .catch((err) => console.log(err));
