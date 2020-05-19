'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

const Book = require('../models/book'); 

router.get('/', (req, res, next) => {
  res.render('index', {
    style: 'home.css'
  });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private', {
    style: 'style.css'
  });
});

router.get('/search', (req, res, next) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const distance = req.query.distance;

  const kilometersToDegrees = (value) => value / (20000 / 360);
  Book.find()
    .where('location')
    .within()
    .circle({ center: [longitude, latitude], radius: kilometersToDegrees(distance) })
    .then((restaurants) => {
      res.render('restaurant/list', { restaurants });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
