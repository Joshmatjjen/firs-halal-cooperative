const express = require('express');
const investController = require('../controllers/investController');
const authController = require('../controllers/authController');

const investRouter = express.Router({ mergeParams: true });

// Auth MIDDLEWARE 👇
investRouter.use(authController.protect);
// After this 👆  MIDDLEWARE  👇 Users must be authenticated. Route will be protected

investRouter.route('/').get(investController.getAllInvests).post(
  authController.restrictTo('user', 'admin'),
  // If using factory function
  //  START
  investController.setUserIds,
  investController.checkStatus,
  // END
  investController.createInvest
);

investRouter
  .route('/:id')
  .get(investController.getInvest)
  .patch(
    authController.restrictTo('user', 'admin'),
    investController.updateInvest
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    investController.deleteInvest
  );

investRouter
  .route('/me/:userId')
  .get(investController.getMyInvest)
  .patch(
    authController.restrictTo('user', 'admin'),
    investController.updateInvest
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    investController.deleteInvest
  );

investRouter
  .route('/approve/:id')
  .patch(
    authController.restrictTo('executive'),
    investController.approveInvest
  );

investRouter
  .route('/disapprove/:id')
  .patch(authController.restrictTo('admin'), investController.disapproveInvest);

module.exports = investRouter;
