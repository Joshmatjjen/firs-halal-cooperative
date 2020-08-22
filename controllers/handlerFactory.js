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
    }).select('+active');

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
    let body, doc;
    let filter = { user: req.body.user, status: 'pending' };
    const currentUser = new APIFeatures(
      User.find({ _id: req.body.user }),
      req.query
    );
    const myProfile = await currentUser.query;
    if ((myProfile[0].activeLoan = {} || myProfile[0].activeLoan === null)) {
      const loanUser = new APIFeatures(Model.find(filter), req.query);
      const pendingUser = await loanUser.query;
      console.log(pendingUser.length);
      if (pendingUser.length >= 1) {
        console.log('no loan');
        return next(
          new AppError(
            'You already have a pending loan which have not being reviewed by the executive',
            404
          )
        );
      } else {
        if (User) {
          let lcs = await User.findOne({ executive: { isLCS: true } }).then(
            (user) => user._id
          );
          let lcc = await User.findOne({ executive: { isLCC: true } }).then(
            (user) => user._id
          );
          let auditor = await User.findOne({
            executive: { isAuditor: true },
          }).then((user) => user._id);
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
      }
    } else {
      return next(new AppError('You already have an active loan', 404));
    }
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    query
      .select('+active')
      .populate({
        path: 'approval.onLCS.user',
        select: 'firstName lastName role photo',
      })
      .populate({
        path: 'approval.onLCC.user',
        select: 'firstName lastName role photo',
      })
      .populate({
        path: 'approval.onAuditor.user',
        select: 'firstName lastName role photo',
      })
      .populate({
        path: 'approval.onPresident.user',
        select: 'firstName lastName role photo',
      })
      .populate({
        path: 'user',
        select: 'firstName lastName role photo soo contribution',
      });
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

exports.getAll = (Model, Type) =>
  catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    // To allow for nested GET reviews on tour (hack)
    console.log(Type);
    const docCount = await Model.countDocuments({ role: 'user' }).exec();
    console.log(docCount);
    let filter = {};
    if (req.query.user) filter = { user: req.query.user };
    // if (Type === 'user') filter = { role: `` };
    const features = new APIFeatures(
      Model.find(filter)
        .select('+active')
        .populate({
          path: 'approval.onLCS.user',
          select: 'firstName lastName role photo',
        })
        .populate({
          path: 'approval.onLCC.user',
          select: 'firstName lastName role photo',
        })
        .populate({
          path: 'approval.onAuditor.user',
          select: 'firstName lastName role photo',
        })
        .populate({
          path: 'approval.onPresident.user',
          select: 'firstName lastName role photo',
        })
        .populate({
          path: 'user',
          select: 'firstName lastName role photo soo contribution',
        }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    let doc = await features.query;
    if (Type === 'user')
      doc = await doc.filter(
        (user) => user.role === 'user' || user.role === 'admin'
      );

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

exports.approveOne = (Model, User) =>
  catchAsync(async (req, res, next) => {
    let update, doc;
    let approve = req.body.approve;
    const expid = (dur, approvedDate) => {
      // var d = new Date(Date.now());
      approvedDate.setMonth(approvedDate.getMonth() + dur);
      return new Date(approvedDate);
    };
    switch (req.body.executiveType) {
      case 'LCS':
        update = {
          'approval.onLCS.user': req.body.userId,
          'approval.onLCS.isApproved': req.body.approve,
          'approval.onLCS.comment': req.body.comment,
          'approval.onLCS.actionDate': Date.now(),
        };
        break;
      case 'LCC':
        update = {
          'approval.onLCC.user': req.body.userId,
          'approval.onLCC.isApproved': req.body.approve,
          'approval.onLCC.comment': req.body.comment,
          'approval.onLCC.actionDate': Date.now(),
        };
        break;
      case 'Auditor':
        update = {
          'approval.onAuditor.user': req.body.userId,
          'approval.onAuditor.isApproved': req.body.approve,
          'approval.onAuditor.comment': req.body.comment,
          'approval.onAuditor.actionDate': Date.now(),
        };
        break;
      case 'President':
        update = {
          'approval.onPresident.user': req.body.userId,
          'approval.onPresident.isApproved': req.body.approve,
          'approval.onPresident.comment': req.body.comment,
          'approval.onPresident.actionDate': Date.now(),
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
      })
        .populate({
          path: 'approval.onLCS.user',
          select: 'firstName lastName role photo',
        })
        .populate({
          path: 'approval.onLCC.user',
          select: 'firstName lastName role photo',
        })
        .populate({
          path: 'approval.onAuditor.user',
          select: 'firstName lastName role photo',
        })
        .populate({
          path: 'approval.onPresident.user',
          select: 'firstName lastName role photo',
        });
      // doc = await Model.update(
      //   { _id: req.params.id },
      //   { 'approval.onLCS.comment': req.body.comment }
      // ).exec();
      if (doc.status === 'approved') {
        let loan = await Model.findByIdAndUpdate(req.params.id, {
          expiresAt: expid(doc.duration, doc.seenAt),
        });
        if (User) {
          await User.findByIdAndUpdate(doc.user.id, {
            'activeLoan._id': doc.id,
            'activeLoan.type': doc.type,
            'activeLoan.amount': doc.amount,
            'activeLoan.monthlyRefund': doc.perMonthRefund,
            'activeLoan.duration': doc.duration,
            'activeLoan.activatedDate': Date.now(),
            'activeLoan.expiringDate': loan.expiresAt,
          });
        }
      }
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
