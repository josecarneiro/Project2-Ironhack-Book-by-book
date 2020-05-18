'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nameCreator: { 
    type: String,
    trim: true
  },
  content:{ 
    type: String
  },
  post: {
    //link to mongoose.book
  }
});

const Comment = mongoose.model('Comment', schema);
module.exports = Comment;