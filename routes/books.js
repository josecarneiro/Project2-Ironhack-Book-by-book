'use strict';

const express = require('express');
const bookRouter = new express.Router();

const routerguard = require('./../middleware/route-guard');

// Display Single book page

bookRouter.get('/test', (req, res, next) => {
  // /:id
  res.render('book/singleBook',{
    style: 'style.css'
  });
});

bookRouter.get('/test/create', (req, res, next) => {
  // /:id
  res.render('book/AddBookLogic',{
    style: 'style.css'
  });
});

//
module.exports = bookRouter;
