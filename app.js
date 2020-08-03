const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

// dotenv.config({ path: './process.env.env' });

const AppError = require("././utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const emailTemplate = require("./utils/emailTemplate");
const { cloudinary } = require("./utils/imageUpload");
const { response } = require("express");
const cors = require("cors");
const loanRouter = require("./routes/loanRoutes");

const app = express();
app.use(cors());
// INTITIATING PUG TEMPLATE ENGINE
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));
// 1) GLOBAL 🌏  MIDDLEWARE
// Serving static files
// app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers

app.use(helmet());
async function upload() {
  // app.post("/api/upload", (req, res) => {
  // try {
  const fileStr = "";

  // cloudinary.image.
  // console.log(uploadResponse);
  // } catch (e) {
  //   console.error(e);
  // }
  // });
}
// Development logging
if (process.env.NODE_ENV === "development") {
  // console.log(emailTemplate("Joshua", "Ezinwa", "www.google.com"));
  upload();
  app.use(morgan("dev"));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50mb" }));
// Getting data from form
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against NoSQL query injection
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       "duration",
//       "ratingsAverage",
//       "ratingsQuantity",
//       "maxGroupSize",
//       "difficulty",
//       "price",
//     ],
//   })
// );

// Serving static files
// app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// 2) ROUTES

app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/loans", loanRouter);

// This MIDDLEWARE Should always be at the last part of route.. //Below all route or middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// 3) START SERVER

module.exports = app;
