var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var app = express();
var externalRoutes = require('./routes/externalRoutes');
var secrets = require('./config');
//rsconst passport = require('passport');

console.log({secrets});
console.log(secrets.MongoDBLink);

//Connection to the db use connect
mongoose.connect(
	secrets.MongoDBLink,
  { useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection.useDb('test');
db.once("open", () => console.log('connected to the database'));
db.on("error", console.log.bind(console, "MongoDb connection error"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/externalRoutes', externalRoutes);
app.use('/testAPI', testAPIRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.json({err});
 res.render('error');
});

module.exports = app;
