'use strict';
module.exports = (id) => (req, res, next) => {
  let owner;
  console.log('owner');
  if (id === req.user.id) {
    owner = true;
    next();
  } else {
    owner = false;
    const error = new Error('Not authorized');
    next(error);
    res.redirect('/');
  }
  console.log(owner);
  return owner;
};
