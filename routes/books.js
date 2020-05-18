'use strict';

const express = require('express');
const bookRouter = new express.Router();

const routerguard = require('./../middleware/route-guard');

// Display Single book page

bookRouter.get('/test', (req, res, next) => {
  // /:id
  res.render('book/singleBook');
});

//
module.exports = bookRouter;
