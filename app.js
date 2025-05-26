var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Auth middleware
app.use((req, res, next) => {
  console.log("Auth check for:", req.url); // Debug
  if (req.headers.authorization && req.headers.authorization === "123") {
    return next();
  }

  console.log("Blocking unauthorized access to: ", req.url);
  res.status(401).json({ message: "Unauthorized" });
  return;
});

// Static files 
// app.use(express.static(path.join(__dirname, 'public')));

//Protected Routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', taskRouter);
app.use('/goals', goalsRouter);

// Error handlers 
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
