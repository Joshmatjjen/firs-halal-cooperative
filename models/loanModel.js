// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');
const User = require('./userModel');

const loanSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      lowercase: true,
      enum: ['conventional', 'emergency'],
      required: [true, 'Loan type can not be empty!'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'disapproved'],
      default: 'pending',
      // required: [true, "Loan status can not be empty!"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'This must be a User'],
    },
    approval: {
      onLCS: {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          default: null,
        },
        isApproved: {
          type: Boolean,
          default: false,
        },
        comment: {
          type: String,
          default: '',
        },
        actionDate: {
          type: Date,
        },
      },
      onLCC: {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          default: null,
        },
        isApproved: {
          type: Boolean,
          default: false,
        },
        comment: {
          type: String,
          default: '',
        },
        actionDate: {
          type: Date,
        },
      },
      onAuditor: {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          default: null,
        },
        isApproved: {
          type: Boolean,
          default: false,
        },
        comment: {
          type: String,
          default: '',
        },
        actionDate: {
          type: Date,
        },
      },
      onPresident: {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          default: null,
        },
        isApproved: {
          type: Boolean,
          default: false,
        },
        comment: {
          type: String,
          default: '',
        },
        actionDate: {
          type: Date,
        },
      },
    },
    amount: {
      type: Number,
      required: [true, 'Amount can not be empty!'],
      validate: {
        validator: async function (el) {
          let savingsMaxData;
          let data = await User.findById(this.user)
            .exec()
            .then((user) => user.contribution.savingsAccount);
          if (this.type === 'conventional') savingsMaxData = data * 2;
          if (this.type === 'emergency') savingsMaxData = data * (35 / 100);
          let maximum = Math.round(savingsMaxData);
          console.log(this.type, '/ ', Math.round(savingsMaxData));
          console.log('Model', maximum);
          return el <= maximum;
        },
        message: 'You have reached your Maximum Amount limit',
      },
      // maxlength: this.amount,
    },
    duration: {
      type: Number,
      validate: {
        validator: function (el) {
          let max;
          if (this.type === 'conventional') max = 24;
          if (this.type === 'emergency') max = 3;
          return el <= max;
        },
        message: 'You have reached your Maximum Duration limit',
      },
      required: [true, 'Duration can not be empty!'],
    },
    perMonthRefund: {
      type: Number,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    seenAt: {
      type: Date,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// QUERY MIDDLEWARE
// loanSchema.index({ user: 1 }, { unique: true });

loanSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });
  this.populate({
    path: 'user',
    select: 'id firstName role',
  });
  this.populate({
    path: 'approval:{onLCS:{user}}',
    select: 'id firstName role',
  });
  next();
});

loanSchema.pre('save', async function (next) {
  // Only run this function if duration was actually modified
  if (!this.isModified('duration')) return next();

  // Implementing Refund Per Month
  let perMonthRefunds;
  let amount = this.amount;
  let duration = this.duration;

  perMonthRefunds = amount / duration;

  this.perMonthRefund = Math.round(perMonthRefunds);

  next();
});

loanSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// loanSchema.post("save", function () {
//   // "this" point to current review
//   // "this.constructor" point to the model who create that document
//   this.constructor.calcAverageRatings(this.tour);
// });

// findByIdAndUpdate
// findByIdAndDelete
loanSchema.pre(/^findOneAnd/, async function (next) {
  this.rev = await this.findOne();
  // console.log(this.rev);
  next();
});

// loanSchema.post(/^findOneAnd/, async function () {
//   // await this.findOne(); does NOT work here, query has already executed
//   await this.rev.constructor.calcAverageRatings(this.rev.tour);
// });

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
