const Invest = require('../models/investModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllInvests = factory.getAll(Invest);
// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };

//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: 'success',
//     results: reviews.length,
//     data: {
//       reviews
//     }
//   });
// });

//Use middleware if using the createInvest..  factory function
exports.setUserIds = (req, res, next) => {
  // Allow nested route
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.checkStatus = catchAsync(async (req, res, next) => {
  if (req.body.status) {
    req.body.status = 'pending';
    next();
  }
  next();
});

exports.approveInvest = factory.approveOne(Invest, User);

exports.disapproveInvest = factory.disapproveOne(Invest);

exports.getInvest = factory.getOne(Invest);

exports.getMyInvest = factory.getMine(Invest);

exports.createInvest = factory.createOne(Invest, User);
// exports.createReview = catchAsync(async (req, res, next) => {
//   // Allow nested route
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;

//   const newReview = await Review.create(req.body);

//   res.status(201).json({
//     staus: 'success',
//     data: {
//       review: newReview
//     }
//   });
// });

exports.updateInvest = factory.updateOne(Invest);

exports.deleteInvest = factory.deleteOne(Invest);
