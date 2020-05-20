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
  res.render('book/singleBook');
});

router.get('/test/create', (req, res, next) => {
  // /:id
  res.render('book/AddBookLogic');
});

router.get('/search', (req, res) => {
  res.render('user/searchBook');
});

router.get('/result', (req, res, next) => {
  const title = req.query.title;
  const maxResults = 5;
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${title}&startIndex=0&maxResults=${maxResults}`
    )
    .then((result) => {
      const bookResults = [];
      // console.log(result.data.items.volumeInfo);
      for (let i = 0; i < maxResults; i++) {
        // console.log('original', result.data.items);
        bookResults.push({
          title: result.data.items[i].volumeInfo.title,
          subtitle: result.data.items[i].volumeInfo.subtitle,
          authors: result.data.items[i].volumeInfo.authors,
          id: result.data.items[i].id,
          descripition: result.data.items[i].volumeInfo.descripition
        });
      }
      console.log(bookResults);
      res.render('user/searchResult', { bookResults });
    })
    .catch((error) => {
      console.log('There was an error loading response from api');
      console.log(error);
      res.send('There was an error processing your request.');
    });
});
// Display create book page

router.get('/create/:id', (req, res) => {
  const id = req.params.id;
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${id}&startIndex=0&maxResults=1`)
    .then((result) => {
      const singleBook = {
        title: result.data.items[0].volumeInfo.title,
        subtitle: result.data.items[0].volumeInfo.subtitle,
        authors: result.data.items[0].volumeInfo.authors,
        id: result.data.items[0].id,
        description: result.data.items[0].volumeInfo.description
      };
      console.log(singleBook);
      res.render('user/addbook', { singleBook });
    })
    .catch((error) => {
      console.log('There was an error loading response from api');
      console.log(error);
      res.send('There was an error processing your request.');
    });
});

router.post('/create', (req, res, next) => {
  const bookTitle = req.body.title;
  const bookAuthor = req.body.author;
  const booksComment = req.body.comment;
  const latitude = req.body.lat;
  const longitude = req.body.lng;
  console.log(longitude);
  console.log(latitude);

  Book.create({
    bookTitle,
    booksComment,
    userCreator: req.user._id,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then((book) => {
      console.log(book);
      res.redirect(`/book/${book._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findById(id)
    .then((result) => {
      console.log('here', result);
      res.render('book/singlebook', { result });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;

// router.get('/search', (req, res) => {
//   const title = req.query.title;
//   axios
//     .get(`https://www.googleapis.com/books/v1/volumes?q=${title}&startIndex=0&maxResults=40`)
//     .then((result) => {
//       const titleResults = result.data.items.map((books) => {
//         let infoBook = '';
//         return (infoBook = `${books.volumeInfo.title} - ${books.volumeInfo.authors}`);
//       });
//       const idResults = result.data.items.map((books) => {
//         let bookId = '';
//         return (bookId = `${books.id}`);
//       });
//       console.log(idResults);
//       res.render('user/searchResult', {
//         titleResults
//       });
//     })
//     .catch((error) => {
//       console.log('There was an error loading response from api');
//       console.log(error);
//       res.send('There was an error processing your request.');
//     });
// });
