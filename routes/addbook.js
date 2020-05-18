'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/bookcreate', (req, res, next) => {
  res.render('user/addbook');
  });

router.post('/bookcreate', (req, res, next) => {
  console.log('Form posted to the server');
  console.log(req.body);
  res.render('user/addbook');
});

module.exports = router;