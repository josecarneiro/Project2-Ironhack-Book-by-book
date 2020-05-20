const { Router } = require('express');
const router = new Router();
const Book = require('../models/book');
const routerguard = require('../middleware/route-guard');

router.get('/', (req, res, next) => {
  Book.find(); // maybe  add sort
  res.render('book/list');
});

router.get('/search', (req, res, next) => {
  const title = req.query.title;
  const latitude = req.query.lat;
  const longitude = req.query.lng;
  const distance = req.query.distance;
  const kilometersToDegrees = (value) => value / (20000 / 360);
  console.log(title, latitude, longitude, distance);
  Book.find()
    .where('location')
    .within()
    .circle({ center: [longitude, latitude], radius: kilometersToDegrees(distance) })
    .then((books) => {
      res.render('book/list', { books });
    })
    .catch((error) => {
      next(error);
    });

  // res.render('book/list', { books });
});

router.get('/book/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findById(id)
    .then((result) => {
      console.log('here', result);
      res.render('book/singleBook', { result });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
