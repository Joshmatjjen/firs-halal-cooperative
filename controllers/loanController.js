const Loan = require('../models/loanModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllLoans = factory.getAll(Loan);
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

//Use middleware if using the createLoan..  factory function
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

exports.approveLoan = factory.approveOne(Loan);

exports.disapproveLoan = factory.disapproveOne(Loan);

exports.getLoan = factory.getOne(Loan);

exports.getMyLoan = factory.getMine(Loan);

exports.createLoan = factory.createOne(Loan);
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

exports.updateLoan = factory.updateOne(Loan);

exports.deleteLoan = factory.deleteOne(Loan);
