const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model, User) =>
  catchAsync(async (req, res, next) => {
    // const newTour = new Tour({});
    // newTour.save();
    let body, doc;
    if (User) {
      let lcs = await User.findOne({ executive: { isLCS: true } }).then(
        (user) => user._id
      );
      let lcc = await User.findOne({ executive: { isLCC: true } }).then(
        (user) => user._id
      );
      let auditor = await User.findOne({ executive: { isAuditor: true } }).then(
        (user) => user._id
      );
      let president = await User.findOne({
        executive: { isPresident: true },
      }).then((user) => user._id);
      body = {
        ...req.body,
        approval: {
          onLCS: {
            user: lcs,
          },
          onLCC: {
            user: lcc,
          },
          onAuditor: {
            user: auditor,
          },
          onPresident: {
            user: president,
          },
        },
      };
      doc = await Model.create(body);
    } else {
      doc = await Model.create(req.body);
    }

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    // To allow for nested GET reviews on tour (hack)
    const docCount = await Model.countDocuments({ role: 'user' }).exec();
    console.log(docCount);
    let filter = {};
    if (req.query.user) filter = { user: req.query.user };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getMine = (Model) =>
  catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    // To allow for nested GET reviews on tour (hack)
    console.log(req.params.userId);

    let filter = {};
    if (req.params.userId) filter = { user: req.params.userId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.approveOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let update, doc;
    let approve = req.body.approve;
    switch (req.body.executiveType) {
      case 'LCS':
        update = {
          approval: {
            onLCS: {
              user: req.body.userId,
              isApproved: req.body.approve,
              comment: req.body.comment,
              actionDate: Date.now(),
            },
          },
        };
        break;
      case 'LCC':
        update = {
          approval: {
            onLCC: {
              user: req.body.userId,
              isApproved: req.body.approve,
              comment: req.body.comment,
              actionDate: Date.now(),
            },
          },
        };
        break;
      case 'Auditor':
        update = {
          approval: {
            onAuditor: {
              user: req.body.userId,
              isApproved: req.body.approve,
              comment: req.body.comment,
              actionDate: Date.now(),
            },
          },
        };
        break;
      case 'President':
        update = {
          approval: {
            onPresident: {
              user: req.body.userId,
              isApproved: req.body.approve,
              comment: req.body.comment,
              actionDate: Date.now(),
            },
          },
          status: 'approved',
          seenAt: Date.now(),
        };
        break;
      default:
        break;
    }
    if (update) {
      doc = await Model.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
      });
    }

    if (!doc) {
      return next(
        new AppError(
          'An Error Occur While Approving Loan, Please check your internet',
          404
        )
      );
    }
    res.status(200).json({
      status: 'success',
      message: approve
        ? 'Loan has being approved'
        : 'Loan has being disapproved',
      data: {
        data: doc,
      },
    });
  });

exports.disapproveOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      { status: 'disapproved', seenAt: Date.now() },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      message: 'Loan has being disapproved',
      data: {
        data: doc,
      },
    });
  });
