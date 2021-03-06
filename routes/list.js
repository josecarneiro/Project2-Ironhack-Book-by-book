const { Router } = require('express');
const router = new Router();
const Book = require('../models/book');
const routerguard = require('../middleware/route-guard');

router.get('/', (req, res, next) => {
  Book.find()
    .then((books) => {
      console.log(books);
      res.render('book/list', { books });
    })
    .catch((error) => next(error)); // maybe  add sort
});

router.get('/search', (req, res, next) => {
  const title = req.query.title;
  const term = new RegExp(title, 'i');
  console.log(term);
  const latitude = req.query.lat;
  const longitude = req.query.lng;
  const distance = req.query.distance;
  const minDistance = 100;
  // const distance = inputDistance === 0 ? distance : minDistance;
  console.log(distance);
  const kilometersToDegrees = (value) => value / (20000 / 360);
  // console.log(title, latitude, longitude, distance);
  Book.find({ bookTitle: term })
    .where('location')
    .within()
    .circle({ center: [longitude, latitude], radius: kilometersToDegrees(distance) })
    .then((books) => {
      res.render('book/list', { books });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findById(id)
    .populate('userCreator')
    .then((result) => {
      res.render('book/singleBook', { result });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
