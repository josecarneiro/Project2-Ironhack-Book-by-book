'use strict';

const Book = require('../models/book');

const ownerGuard = (bookId, userId) =>
  new Promise((resolve, reject) => {
    let ownerCheck;
    Book.findById(bookId)
      .then((result) => {
        const bookOwner = result.userCreator;

        if (bookOwner.toString() === userId.toString()) {
          ownerCheck = true;
          console.log(ownerCheck);
        } else {
          ownerCheck = false;
          console.log(ownerCheck);
        }
      })
      .catch((error) => console.log(error));

    return ownerCheck;
  });

module.exports = ownerGuard;
