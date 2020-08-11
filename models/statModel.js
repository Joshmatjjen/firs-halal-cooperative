const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { cloudinary } = require('../utils/imageUpload');
const AppError = require('../utils/appError');

const statSchema = new mongoose.Schema({
  totalMembers: {
    type: Number,
    default: 0,
  },
  totalUsers: {
    type: Number,
    default: 0,
  },
  totalConfirmedUsers: {
    type: Number,
    default: 0,
  },
  totalAdmins: {
    type: Number,
    default: 0,
  },
  totalLoanExpenses: {
    type: Number,
    default: 0,
  },
  totalLoans: {
    type: Number,
    default: 0,
  },
  totalPendingLoans: {
    type: Number,
    default: 0,
  },
  totalApprovedLoans: {
    type: Number,
    default: 0,
  },
  totalDisapprovedLoans: {
    type: Number,
    default: 0,
  },
  totalActiveLoans: {
    type: Number,
    default: 0,
  },
  totalMonthlyContribution: {
    type: Number,
    default: 0,
  },
  totalSavings: {
    type: Number,
    default: 0,
  },
  totalInvestments: {
    type: Number,
    default: 0,
  },
});

statSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

statSchema.pre('save', function (next) {
  if (!this.isModified('contribution')) return next();
  this.contribution.savingsAccount =
    this.contribution.totalMC * (this.contribution.savingsAccount / 100);
  this.contribution.investmentAccount =
    this.contribution.totalMC * (this.contribution.investmentAccount / 100);

  next();
});

statSchema.pre('save' || /^find/, async function (next) {
  // Only run this function if photo was actually modified
  let result;
  try {
    !this.isModified('photo') ? next() : null;
    result = await cloudinary.uploader.upload(this.photo, {
      upload_preset: 'firs-halal',
    });
    result ? (this.photo = result.public_id) : null;
  } catch (err) {
    console.error(err);
  }
  next();
});

// Regex for checking all request using find (i.e: findOne, findAndUpdate.. etc);
statSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

statSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

statSchema.methods.createPasswordResetToken = function () {
  console.log({ resetToken }, this.passwordResetToken);

  // PasswordResetExprise 10 mins
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;
