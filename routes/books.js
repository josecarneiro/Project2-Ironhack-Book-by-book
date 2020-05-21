'use strict';

const { Router } = require('express');
const router = new Router();
const Book = require('../models/book');
const User = require('./../models/user');
const axios = require('axios');
const apiKey = process.env.BOOK_API_KEY;
const routeGuard = require('./../middleware/route-guard');

// Display Single book page

// router.get('/test', (req, res, next) => {
//   /:id
//   res.render('book/singleBook');
// });

// router.get('/test/create', (req, res, next) => {
//   /:id
//   res.render('book/AddBookLogic');
// });

router.get('/search', (req, res) => {
  res.render('user/searchBook');
});

router.get('/result', (req, res, next) => {
  const title = req.query.title;
  const maxResults = 30;
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
        description: result.data.items[0].volumeInfo.description,
        smallThumbnail: result.data.items[0].volumeInfo.imageLinks.smallThumbnail
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
  // If have time, add file uploader
  const { bookTitle, author, bookComment, thumb, latitude, longitude, description } = req.body;

  Book.create({
    bookTitle,
    bookComment,
    author,
    thumb,
    description,
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
      res.render('book/singlebook', { result });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const cookiesId = req.user._id;
  Book.findById(id)
  .then((result) => {
    let owner = id.toString() === cookiesId.toString() ? true : false;
    console.log(owner);
    res.render('user/editBook', { result });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.post('/:id/edit', routeGuard, (req, res, next) => {
  const creatorId = req.body.userCreator; // //if have time, add a if(owner) to add an extray safety layer else{ redirect '/'}
  const { name, about } = req.body;
  const { bookTitle, author, bookComment, thumb, latitude, longitude, description } = req.body;
  const id = req.params.id;
  const cookiesId = req.user._id;

  // let owner = cookiesId.toString() === creatorId.toString() ? true : false;

  Book.findByIdAndUpdate(
    id,
    {
      bookTitle,
      bookComment,
      author,
      thumb,
      description,
      userCreator: req.user._id
      // location: { // if update geolocatio, everthing breaks
      //   coordinates: [longitude, latitude]
      // }
    },
    { new: true }
  )
    .then((book) => {
      console.log(book);
      res.redirect(`/book/${book._id}`);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/list');
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
