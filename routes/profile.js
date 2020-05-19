'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');
const uploader = require('../middleware/uploader');
const OwnerGuard = require('./../middleware/owner-guard');

router.get('/:id', routeGuard, (req, res, next) => {
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
module.exports = router;
