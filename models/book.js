const mongoose = require('mongoose');

const bookschema = new mongoose.Schema({
  bookTitle: {
    type: String,
    trim: true
  },
  author: {
    type: String
  },
  bookComment: {
    type: String
  },
  userCreator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{ type: Number, min: -180, max: 180 }]
    // linkar path aqui
  },
  thumb: {
    type: String
  },
  picture: {
    type: String
  },
  description: {
    type: String
  }
});
bookschema.index({ location: '2dsphere' });

const Book = mongoose.model('Book', bookschema);
module.exports = Book;
