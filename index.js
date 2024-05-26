import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Book } from './models/booksModel.js';

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/MERN_BOOK_STORE')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST API endpoint to create a new book
app.post('/books', async (req, res) => {
  try {
    // Create a new book document based on the request body
    const newBook = new Book(req.body);

    // Save the book document to the database
    await newBook.save();

    res.status(201).json({ message: 'Book created successfully', data: newBook });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Error creating book' });
  }
});

// GET API endpoint to fetch all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});


//  get data by id
app.get("/book/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const books=await Book.findById(id)
        res.status(200).json(books)
    } catch (error) {
        console.log(error.message)
    }
})

// GET API endpoint to filter books by category
app.get('/books/category/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const books = await Book.find({ category });
      res.status(200).json({ count: books.length, data: books });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
// PUT API endpoint to update a book by ID
app.put('/book/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});


// find by id and Delete data
app.delete("/book/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const books=await Book.findByIdAndDelete(id)
        if(books){
            res.status(200).json({message:"deleted successfully"})
        }
        res.status(500).json({message:error.message})

    } catch (error) {
        console.log(error.message)
    }
})
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
