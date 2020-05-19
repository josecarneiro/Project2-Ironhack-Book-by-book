const mongoose = require('mongoose');

const bookschema = new mongoose.Schema({
  bookTitle: {
    type: String,
    trim: true
  },
  author: {
    type: String
  },
  booksComment: {
    type: String
  },
  idChannel: {
    //linkar o nome do channel
    type: String
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{ type: Number, min: -180, max: 180 }]
    // linkar path aqui
  },

  pictureUrl: {
    type: String,
    default:
      'https://res.cloudinary.com/dzf57hnmi/image/upload/v1589323455/Lab%20File%20Upload/vkieav0emdln4jpjdy7y.jpg'
  }
});
bookschema.index({ location: '2dsphere' });

const Book = mongoose.model('Book', bookschema);
module.exports = Book;
