const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Stat = require('../models/statModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const emailTemplate = require('../utils/emailTemplate');
const { cloudinary } = require('../utils/imageUpload');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, message, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    message,
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  // let role = req.body.role;
  // if (role === 'super-admin' || role === 'executive') {
  //   return next(
  //     new AppError('You have no permission to signup with this role', 400)
  //   );
  // }
  const newUser = await User.create(req.body);
  const message = 'Signup Was Successful';
  createSendToken(newUser, 201, message, res);
  try {
    await sendEmail({
      email: newUser.email,
      subject: 'Welcome to FIRS-HALAL Cooperative Society',
      message,
      html: emailTemplate(
        'Welcome to FIRS-HALAL Cooperative Society',
        'Your Signup&nbsp;was Successful',
        'If you did not make this request, just ignore this email. Otherwise, please click the button below to get started',
        'https://itjmcv.stripocdn.email/content/guids/CABINET_1018e16b6a7d1a1d652ba0eed8d9a849/images/11961595598287770.png',
        newUser.firstName,
        newUser.lastName,
        'https://firs-halal-ui.herokuapp.com/dashboard'
      ),
    });
  } catch (err) {
    console.log(err);
  }
});

exports.login = catchAsync(async (req, res, next) => {
  // const user = await User.findOne({ executive: { isPresident: true } });
  // console.log(user);
  // try {
  //   const newStat = await Stat.create({});
  //   console.log(newStat);
  //   next();
  // } catch (error) {
  //   console.log(error);
  //   next();
  // }
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // 2) Check if user exists && password is correct
  let user = await User.findOne({ email: email }).select('+password +active');
  // const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  if (user && !user.active) {
    return next(
      new AppError(
        'Sorry Your Account Have Being Ban or Deactivated. If You Are Not Guilty, Please Contact The Cooperative Administration Or',
        // 'Alaye u don provoke admin, now him don comot ur account, If u know say your way clean, Abeg follow am talk, maybe he fit forgive u. Or',
        401
      )
    );
  }
  // let newUser = { first:{user.firstName} };
  // 3) If everything ok, send token to client
  const message = 'Login Was Successful';
  createSendToken(user, 200, message, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access', 401)
    );
  }
  //  2) Varification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does not longer exist',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changesPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changesPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles["admin"].role = "user";
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get User base on POSTED email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and 
  passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'You password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (error) {
    console.log('Error Message', error);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email, Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user,set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changePasswordAt property for the user

  // 4) Log the user in, send JWT
  const message = 'Your password has being Changed';
  createSendToken(user, 200, message, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTED current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended

  // 4) Log user in, send JWT
  const message = 'Your password has being updated successfully';
  createSendToken(user, 200, message, res);
});
