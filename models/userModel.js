const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { cloudinary } = require("../utils/imageUpload");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your first name"],
    trim: true,
    lowercase: true,
    maxlength: [
      20,
      "user first name must have less or equals t0 20 characters",
    ],
    minlength: [3, "user first name must have more or equals to 3 characters"],
  },
  middleName: {
    type: String,
    // required: [true, "Please tell us your middle name"],
    trim: true,
    lowercase: true,
    maxlength: [
      20,
      "user middle name must have less or equals t0 20 characters",
    ],
    minlength: [3, "user middle name must have more or equals to 3 characters"],
    default: null,
  },
  lastName: {
    type: String,
    required: [true, "Please tell us your last name"],
    trim: true,
    lowercase: true,
    maxlength: [20, "user last name must have less or equals t0 20 characters"],
    minlength: [3, "user last name must have more or equals to 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide your phone number"],
    unique: true,
    // validate: [validator.isNumeric, "Please provide a valid phoneNumber"],
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
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
    required: [true, "Please tell us your marital status"],
    trim: true,
    type: String,
    lowercase: true,
    enum: ["single", "married", "others"],
    default: "others",
  },
  dob: {
    type: Date,
    required: [true, "Please tell us your date of birth"],
  },
  soo: {
    type: String,
    required: [true, "Please tell us your state of origin"],
  },
  residentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
    required: [true, "Please tell us your permanent address"],
  },
  irNo: {
    type: Number,
    required: [true, "Please tell us your IR Number"],
  },
  photo: {
    type: String,
    required: [true, "Add your personal photo"],
  },
  deploymentAddress: {
    type: String,
    required: [true, "Please tell us your deployment address"],
  },
  officeAddress: {
    type: String,
  },
  salaryGrade: {
    type: String,
    required: [true, "Please tell us your deployment address"],
  },
  confirmed: {
    type: String,
    enum: ["yes", "no"],
    lowercase: true,
    required: [true, "Please tell us if you are confirmed"],
  },
  employmentDate: {
    type: Date,
    required: [true, "Please tell us date of your employment"],
  },
  repDetails: {
    firstName: {
      type: String,
      required: [true, "Please tell us your representative first name"],
      trim: true,
      lowercase: true,
      maxlength: [
        20,
        "Representative first name must have less or equals to 20 characters",
      ],
      minlength: [
        3,
        "Representative first name must have more or equals to 3 characters",
      ],
    },
    lastName: {
      type: String,
      required: [true, "Please tell us your representative last name"],
      trim: true,
      lowercase: true,
      maxlength: [
        20,
        "Representative first name must have less or equals t0 20 characters",
      ],
      minlength: [
        3,
        "Representative last name must have more or equals to 3 characters",
      ],
    },
    relationship: {
      type: String,
      required: [
        true,
        "Please tell us the between you and your representative",
      ],
    },
    address: {
      type: String,
      required: [
        true,
        "Please tell us your representative address (Home or Office)",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please tell us your representative phone number"],
    },
  },
  contribution: {
    totalMC: {
      type: Number,
      required: [true, "Please tell us your total monthly contribution"],
    },
    investmentAccount: {
      type: Number,
      required: [true, "Please tell us your investment account"],
    },
    savingsAccount: {
      type: Number,
      required: [true, "Please tell us your savings account"],
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
      required: [true, "Please tell us your bank name"],
    },
    accountName: {
      type: String,
      required: [true, "Please tell us your bank account number"],
    },
    accountNumber: {
      type: Number,
      required: [true, "Please tell us your bank account number"],
    },
    sortCode: {
      type: String,
    },
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("contribution")) return next();
  this.contribution.savingsAccount =
    this.contribution.totalMC * (this.contribution.savingsAccount / 100);
  this.contribution.investmentAccount =
    this.contribution.totalMC * (this.contribution.investmentAccount / 100);

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre("save", async function (next) {
  // Only run this function if photo was actually modified
  let result;
  try {
    !this.isModified("photo") ? next() : null;
    result = await cloudinary.uploader.upload(this.photo, {
      upload_preset: "firs-halal",
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
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  // PasswordResetExprise 10 mins
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
