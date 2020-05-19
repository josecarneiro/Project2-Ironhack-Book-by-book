'use strict';

const { Router } = require('express');
const router = new Router();
const Book = require('../models/book');
const axios = require('axios');
const routerguard = require('./../middleware/route-guard');
const apiKey = process.env.BOOK_API_KEY;


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

// Display search book page
// router.get('/search', (req, res, next) => {
//   res.render('user/searchbook', {
//   });
// });

router.get('/search', (req, res) => {
  const title = req.query.title;
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${title}&startIndex=0&maxResults=40`)
    //    https://www.googleapis.com/books/v1/volumes?q=${title}:keyes&key=${}
    //   `https://www.googleapis.com/books/v1/volumes?q=${text}&startIndex=0&maxResults=40`
    .then(result => {
      const titleResults = result.data.items.map(books => books.volumeInfo.title);
      const authorResults = result.data.items.map(books => books.volumeInfo.authors);
      console.log(result.data);
      res.render('user/searchbook', {
        titleResults,
        authorResults
      });
    })
    .catch(error =>{
      console.log('There was an error loading response from api');
      console.log(error);
      res.send('There was an error processing your request.');
    });
});

// Display create book page

router.get('/create', (req, res) => {
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


module.exports = router;
