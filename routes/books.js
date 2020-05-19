'use strict';

const { Router } = require('express');
const router = new Router();
const Book = require('../models/book');

const routerguard = require('./../middleware/route-guard');

// Display Single book page

router.get('/test', (req, res, next) => {
  // /:id
  res.render('book/singleBook', {
    style: 'style.css'
  });
});

router.get('/test/create', (req, res, next) => {
  // /:id
  res.render('book/AddBookLogic', {
    style: 'style.css'
  });
});

router.get('/create', (req, res, next) => {
  res.render('user/addbook', {
    style: 'style.css'
  });
});

router.post('/create', (req, res, next) => {
  const bookTitle = req.body.title;
  const booksComment = req.body.comment;
  const latitude = req.body.lat;
  const longitude = req.body.lng;
  console.log(longitude);
  console.log(latitude);

  Book.create({
    bookTitle,
    booksComment,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then((book) => {
      res.render('user/addbook');
    })
    .catch((error) => {
      next(error);
    });
});

//
module.exports = router;
