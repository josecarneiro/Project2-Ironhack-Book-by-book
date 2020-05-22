'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');
const Book = require('../models/book');
const uploader = require('../middleware/uploader');
const OwnerGuard = require('./../middleware/owner-guard');

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const cookiesId = req.user._id;

  User.findById(id)
    .then((userProfile) => {
      const owner = id.toString() === cookiesId.toString() ? true : false;
      res.render('user/profile', { userProfile , owner });

    })
    .catch((error) => next(error));
});

router.get('/:id/edit', (req, res, next) => {
  // OwnerGuard(req.user._id);
  res.render('user/editProfile');
});

router.post('/:id/edit', (req, res, next) => {
  // console.log('hi');
  const id = req.user._id; // //if have time, add a if(owner) to add an extray safety layer else{ redirect '/'}
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, {
    name,
    about
  })
    .then((result) => {
      res.redirect(`/profile/${id}`);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.get('/:id/edit/avatar', (req, res) => {
  // OwnerGuard(req.user._id);
  res.render('user/editImageProfile');
});

router.post('/:id/edit/avatar', routeGuard, uploader.single('avatar'), (req, res, next) => {
  const id = req.user._id;
  const avatar = req.file.url; //if have time, add a if(owner) to add an extray safety layer else{ redirect '/'}
  User.findByIdAndUpdate(id, {
    avatar
  })
    .then((result) => {
      res.redirect(`/profile/${id}`);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.get('/:id/books', (req, res, next) => {
  const id = req.params.id;
  const currentUser = req.user._id;
  console.log(currentUser);
  Book.find({ userCreator: id })
    .populate('userCreator')
    .then((books) => {
      const owner = books[0].userCreator._id.toString() === currentUser.toString() ? true : false;

      res.render('user/userBooks', { books, owner });
    })
    .catch((error) => next(error));
});

module.exports = router;
