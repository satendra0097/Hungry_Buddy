var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter=require('./routes/category')
var branchRouter=require('./routes/branch')
var statecityRouter=require('./routes/statecity')
var fooditemRouter=require('./routes/fooditem')
var batchRouter=require('./routes/batch')
var sectionRouter=require('./routes/section')
var studentRouter=require('./routes/student')
var adminloginRouter=require('./routes/student')
var adminsRouter=require('./routes/admin')
var employeeRouter=require('./routes/employee')
var deliveryRouter=require('./routes/delivery')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRouter)
app.use('/branch',branchRouter)
app.use('/statecity',statecityRouter)
app.use('/fooditem',fooditemRouter)
app.use('/batch',batchRouter)
app.use('/section',sectionRouter)
app.use('/student',studentRouter)
app.use('/adminlogin',adminloginRouter)
app.use('/admin',adminsRouter)
app.use('/employee',employeeRouter);
app.use('/delivery',deliveryRouter)

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
  res.render('error');
});

module.exports = app;
