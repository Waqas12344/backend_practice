import mongoose from "mongoose";

// Define a schema for the book data
const bookSchema = new mongoose.Schema({
  authorName: String,
  imageUrl: String,
  category: String,
  bookDescription: String,
  bookTitle: String,
  bookPdfUrl: String
},{
    timestamps:true
});

// Define the model based on the schema
export const Book = mongoose.model('Book', bookSchema);


