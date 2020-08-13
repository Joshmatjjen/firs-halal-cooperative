const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { cloudinary } = require('../utils/imageUpload');
const Stat = require('./statModel');
const AppError = require('../utils/appError');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your first name'],
    trim: true,
    lowercase: true,
    maxlength: [
      20,
      'user first name must have less or equals t0 20 characters',
    ],
    minlength: [3, 'user first name must have more or equals to 3 characters'],
  },
  middleName: {
    type: String,
    // required: [true, "Please tell us your middle name"],
    trim: true,
    lowercase: true,
    maxlength: [
      20,
      'user middle name must have less or equals t0 20 characters',
    ],
    minlength: [3, 'user middle name must have more or equals to 3 characters'],
    default: null,
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your last name'],
    trim: true,
    lowercase: true,
    maxlength: [20, 'user last name must have less or equals t0 20 characters'],
    minlength: [3, 'user last name must have more or equals to 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your phone number'],
    unique: true,
    // validate: [validator.isNumeric, "Please provide a valid phoneNumber"],
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'executive', 'super-admin'],
    default: 'user',
  },
  executive: {
    isLCS: {
      type: Boolean,
      // default: false,
      select: function () {
        return this.role === 'super-admin' || this.role === 'executive';
      },
    },
    isLCC: {
      type: Boolean,
      // default: false,
      select: function () {
        return this.role === 'super-admin' || this.role === 'executive';
      },
    },
    isICS: {
      type: Boolean,
      // default: false,
      select: function () {
        return this.role === 'super-admin' || this.role === 'executive';
      },
    },
    isICC: {
      type: Boolean,
      // default: false,
      select: function () {
        return this.role === 'super-admin' || this.role === 'executive';
      },
    },
    isAuditor: {
      type: Boolean,
      // default: false,
      select: function () {
        return this.role === 'super-admin' || this.role === 'executive';
      },
    },
    isPresident: {
      type: Boolean,
      // default: false,
      select: function () {
        return this.role === 'super-admin' || this.role === 'executive';
      },
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  maritalStatus: {
    type: String,
    trim: true,
    type: String,
    lowercase: true,
    enum: ['single', 'married', 'others'],
    required: [
      function () {
        return this.role === 'user';
      },
      'Please tell us your marital status',
    ],
    select: function () {
      return this.role === 'user';
    },
  },
  dob: {
    type: Date,
    required: [
      function () {
        return this.role === 'user';
      },
      'Please tell us your date of birth',
    ],
    select: function () {
      return this.role === 'user';
    },
  },
  soo: {
    type: String,
    lowercase: true,
    required: [
      function () {
        return this.role === 'user';
      },
      'Please tell us your state of origin',
    ],
    select: function () {
      return this.role === 'user';
    },
  },
  secretCode: {
    type: String,
    required: [
      function () {
        return this.role !== 'user';
      },
      'Please type in the secret code',
    ],
    validate: {
      validator: async function (code) {
        let stat = await Stat.findOne({ _id: process.env.STATS_ID }).select(
          '+secretNo'
        );
        return code === stat.secretNo;
      },
      message: 'Please type in a valid secret code',
    },
    select: function () {
      return this.role !== 'user';
    },
  },
  secretNo: {
    type: String,
    select: function () {
      return this.role === 'super-admin';
    },
  },
  residentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
    required: [
      function () {
        return this.role === 'user';
      },
      'Please tell us your permanent address',
    ],
    select: function () {
      return this.role === 'user';
    },
  },
  irNo: {
    type: Number,
    unique: function () {
      return this.role === 'user';
    },
    required: [
      function () {
        return this.role === 'user';
      },
      'Please tell us your Ir No',
    ],
    select: function () {
      return this.role === 'user';
    },
  },
  photo: {
    type: String,
    required: [true, 'Add your personal photo'],
  },
  deploymentAddress: {
    type: String,
    required: [
      function () {
        return this.role === 'user';
      },
      'Please tell us your deployment address',
    ],
    select: function () {
      return this.role === 'user';
    },
  },
  officeAddress: {
    type: String,
  },
  salaryGrade: {
    type: String,
    required: [
      function () {
        return this.role === 'user';
      },
      'Please tell us your deployment address',
    ],
    select: function () {
      return this.role === 'user';
    },
  },
  confirmed: {
    type: String,
    enum: ['yes', 'no'],
    lowercase: true,
    default: 'no',
  },
  employmentDate: {
    type: Date,
    required: [
      function () {
        return this.role === 'user';
      },
      'Please tell us date of your employment',
    ],
    select: function () {
      return this.role === 'user';
    },
  },
  repDetails: {
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [
        20,
        'Representative first name must have less or equals to 20 characters',
      ],
      minlength: [
        3,
        'Representative first name must have more or equals to 3 characters',
      ],
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your representative first name',
      ],
      select: function () {
        return this.role === 'user';
      },
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [
        20,
        'Representative first name must have less or equals t0 20 characters',
      ],
      minlength: [
        3,
        'Representative last name must have more or equals to 3 characters',
      ],
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your representative last name',
      ],
      select: function () {
        return this.role === 'user';
      },
    },
    relationship: {
      type: String,
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us the between you and your representative',
      ],
      select: function () {
        return this.role === 'user';
      },
    },
    address: {
      type: String,
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your representative address (Home or Office)',
      ],
      select: function () {
        return this.role === 'user';
      },
    },
    phoneNumber: {
      type: String,
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your representative phone number',
      ],
      select: function () {
        return this.role === 'user';
      },
    },
  },
  contribution: {
    totalMC: {
      type: Number,
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your total monthly contribution',
      ],
      select: function () {
        return this.role === 'user';
      },
    },

    investmentAccount: {
      type: Number,
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your investment account',
      ],
      select: function () {
        return this.role === 'user';
      },
    },

    savingsAccount: {
      type: Number,
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your savings account',
      ],
      select: function () {
        return this.role === 'user';
      },
    },

    targetAccount: {
      type: Number,
    },
    targetDate: {
      type: Date,
    },
  },
  bankDetails: {
    bankName: {
      type: String,
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your bank name',
      ],
      select: function () {
        return this.role === 'user';
      },
    },

    accountName: {
      type: String,
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your bank account number',
      ],
      select: function () {
        return this.role === 'user';
      },
    },

    accountNumber: {
      type: Number,
      required: [
        function () {
          return this.role === 'user';
        },
        'Please tell us your bank account number',
      ],
      select: function () {
        return this.role === 'user';
      },
    },

    sortCode: {
      type: String,
    },
  },
  activeLoan: {
    _id: {
      type: String,
      select: function () {
        return this.role === 'user';
      },
    },
    type: {
      type: String,
      select: function () {
        return this.role === 'user';
      },
    },
    amount: {
      type: Number,
      select: function () {
        return this.role === 'user';
      },
    },
    duration: {
      type: String,
      select: function () {
        return this.role === 'user';
      },
    },
    activatedDate: {
      type: Date,
      select: function () {
        return this.role === 'user';
      },
    },
    expiringDate: {
      type: Date,
      select: function () {
        return this.role === 'user';
      },
    },
  },
});

// userSchema.index({ irNo: 1 }, { unique: false });

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('contribution')) return next();
  this.contribution.savingsAccount =
    this.contribution.totalMC * (this.contribution.savingsAccount / 100);
  this.contribution.investmentAccount =
    this.contribution.totalMC * (this.contribution.investmentAccount / 100);

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// userSchema.pre(/^find/, async function (next, res) {
//   console.log('restrestic');
//   next();
// });

userSchema.pre('save' || /^find/, async function (next) {
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
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp; // 100 < 200
  }

  // False means NOt changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  // PasswordResetExprise 10 mins
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
