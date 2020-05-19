const { Router } = require('express');
const router = new Router();
const Book = require('../models/book');
const routerguard = require('../middleware/route-guard');

router.get('/', (req, res, next) => {
  Book.find();
  res.render('book/list');
});

router.get('/search', (req, res, next) => {
  const latitude = req.query.lat;
  const longitude = req.query.lng;
  const distance = req.query.distance;
  console.log(latitude, longitude, distance);
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

  res.send(req.query);

  const kilometersToDegrees = (value) => value / (20000 / 360);
});

module.exports = router;
// Book.find()
// .where('location')
// .within()
// .circle({ center: [longitude, latitude], radius: kilometersToDegrees(distance) })
// .then((books) => {
//   res.render('book/list', { books });
// })
// .catch((error) => {
//   next(error);
// });
