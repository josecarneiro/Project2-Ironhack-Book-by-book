
const mongoose = require('mongoose');

const bookschema = new mongoose.Schema({
  bookTitle: {
    type: String,
    trim: true
  },
  author: {
    type: String,
  },
  booksComment: {
    type: String,
  },
  idChannel:{ //linkar o nome do channel
    type: String,
  },
  location:{
    // linkar path aqui
  }
});

const Book = mongoose.model('Book', bookschema);
module.exports = Book;