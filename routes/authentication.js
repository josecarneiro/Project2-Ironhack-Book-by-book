'use strict';

const { Router } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const routerguard = require('./../middleware/route-guard');

const router = new Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHash: hash
      });
    })
    .then((user) => {
      req.session.user = user._id;
      res.redirect('/list');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        res.redirect('sign-up');
        // return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then((result) => {
      if (result) {
        req.session.user = user._id;
        res.redirect('/list');
      } else {
        // return Promise.reject(new Error('Wrong password.'));
        res.redirect('/');
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', routerguard, (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
