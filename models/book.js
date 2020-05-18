'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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

module.exports = mongoose.model('Book', schema);