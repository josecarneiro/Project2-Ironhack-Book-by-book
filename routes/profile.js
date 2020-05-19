const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

router.get('/:id', routeGuard, (req, res, next) => {
  const owner = true; // VOu fazer um middleware para confirmar se é o dono do perfil, se sim o resultado vai ser true
  res.render('user/profile', { owner });
});

router.get('/:id/edit', routeGuard, (req, res, next) => {
  res.render('user/editProfile');
});

router.post('/:id/edit', routeGuard, (req, res, next) => {
  // adiconar o Owner guard
  const id = req.body.id;
  const { name, about, avatar } = req.body;
  console.log(name, about, avatar);
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
      res.redirect(`/profile/${req.body.id}`);
    })
    .catch((error) => next(error));
  // res.render('user/editProfile');
});
module.exports = router;
