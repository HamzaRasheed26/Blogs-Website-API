var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var newBlogRouter = require("./routes/addBlog"); // added by me
var getBlogsRouter = require("./routes/getBlogs"); // added by me
var database = require("./database/sql"); // added by me
const { Console } = require("console");
require("dotenv").config(); // added by me

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors()); // added by me
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://hmzdev-blogswebsite.netlify.app/"
  );
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/newBlog", newBlogRouter); // added by me
app.use("/Blogs", getBlogsRouter); // added by me

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
