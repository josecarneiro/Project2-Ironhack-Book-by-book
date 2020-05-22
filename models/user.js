'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  avatar: {
    type: String,
    default:
      'https://res.cloudinary.com/dzf57hnmi/image/upload/v1590105567/book-by-book/g0hso6bfxex1b2rqocdv.jpg'
  },
  about: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('User', schema);
