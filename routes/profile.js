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
  const owner = true; // Vou fazer um middleware para confirmar se é o dono do perfil, se sim o resultado vai ser true

  User.findById(id)
    .then((user) => {
      res.render('user/profile', { user, owner });
    })
    .catch((error) => next(error));
});
// let test = 'teste@teste';
router.get('/:id/edit', routeGuard, (req, res, next) => {
  OwnerGuard(req.user._id);
  res.render('user/editProfile');
});

router.post('/:id/edit', routeGuard, uploader.single('avatar'), (req, res, next) => {
  // adiconar o Owner guard
  const id = req.params.id;
  const { name, about } = req.body;
  const avatar = req.file.url;
  User.findByIdAndUpdate(
    id,
    {
      name,
      about,
      avatar
    },
    { new: true }
  )
    .then((result) => {
      console.log(result); // not running
      res.redirect(`/profile/${id}`);
    })
    .catch((error) => next(error));
  // res.render('user/editProfile');
});

router.get('/:id/books', (req, res, next) => {
  console.log('its working');
  const id = req.params.id;
  Book.find({ userCreator: id })
    .populate('userCreator')
    .then((books) => {
      console.log(books);
      res.render('user/userBooks', { books });
    })
    .catch((error) => next(error));
});

module.exports = router;
