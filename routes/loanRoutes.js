const express = require('express');
const loanController = require('../controllers/loanController');
const authController = require('../controllers/authController');

const loanRouter = express.Router({ mergeParams: true });

// Auth MIDDLEWARE 👇
loanRouter.use(authController.protect);
// After this 👆  MIDDLEWARE  👇 Users must be authenticated. Route will be protected

loanRouter.route('/').get(loanController.getAllLoans).post(
  authController.restrictTo('user', 'admin'),
  // If using factory function
  //  START
  loanController.setUserIds,
  loanController.checkStatus,
  // END
  loanController.createLoan
);

loanRouter
  .route('/:id')
  .get(loanController.getLoan)
  .patch(authController.restrictTo('user', 'admin'), loanController.updateLoan)
  .delete(
    authController.restrictTo('user', 'admin'),
    loanController.deleteLoan
  );

loanRouter
  .route('/me/:userId')
  .get(loanController.getMyLoan)
  .patch(authController.restrictTo('user', 'admin'), loanController.updateLoan)
  .delete(
    authController.restrictTo('user', 'admin'),
    loanController.deleteLoan
  );

loanRouter
  .route('/approve/:id')
  .patch(authController.restrictTo('executive'), loanController.approveLoan);

loanRouter
  .route('/disapprove/:id')
  .patch(authController.restrictTo('admin'), loanController.disapproveLoan);

module.exports = loanRouter;
