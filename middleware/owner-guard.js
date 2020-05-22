// SECOND BACKUP
// 'use strict';

// const Book = require('../models/book');

// const ownerGuard = (bookId, userId) =>
//   new Promise((resolve, reject) => {
//     let ownerCheck;
//     Book.findById(bookId)
//       .then((result) => {
//         const bookOwner = result.userCreator;

//         if (bookOwner.toString() === userId.toString()) {
//           ownerCheck = true;
//           console.log(ownerCheck);
//         } else {
//           ownerCheck = false;
//           console.log(ownerCheck);
//         }
//       })
//       .catch((error) => console.log(error));

//     return ownerCheck;
//   });

// module.exports = ownerGuard;


// FIRST BACKUP
// 'use strict';
// module.exports = (id) => (req, res, next) => {
//   if (id === req.user._id) {
//     return true;
//   } else {
//     return false;
//   }
// };
// router.get('/:id/edit', routeGuard, (req, res, next) => {
//   OwnerGuard(req.user._id);
//   res.render('user/editProfile');
// });

