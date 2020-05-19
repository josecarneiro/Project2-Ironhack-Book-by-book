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
      'https://res.cloudinary.com/dzf57hnmi/image/upload/v1589323455/Lab%20File%20Upload/vkieav0emdln4jpjdy7y.jpg'
  },

  about: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
