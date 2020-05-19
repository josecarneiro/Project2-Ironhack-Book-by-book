    'use strict';

    const { Router } = require('express');
    const router = new Router();
    const Book = require('../models/book');

   

    router.get('/bookcreate', (req, res, next) => {
      res.render('user/addbook',{
        style: 'style.css'
      });
      });

    router.post('/bookcreate', (req, res, next) => {
      const bookTitle = req.body.title;
      const booksComment = req.body.comment;

      Book.create({
        bookTitle,
        booksComment
      })
        .then(book => {
          console.log('works');
          res.render('user/addbook');
        })
        .catch(error => {
          next(error)
        });
    });

    module.exports = router;