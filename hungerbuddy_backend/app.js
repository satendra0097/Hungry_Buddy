var dotenv = require('dotenv');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var axios = require('axios'); // Added axios
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var branchRouter = require('./routes/branch');
var statecityRouter = require('./routes/statecity');
var fooditemRouter = require('./routes/fooditem');
var batchRouter = require('./routes/batch');
var sectionRouter = require('./routes/section');
var studentRouter = require('./routes/student');
var adminloginRouter = require('./routes/student');
var adminsRouter = require('./routes/admin');
var employeeRouter = require('./routes/employee');
var deliveryRouter = require('./routes/delivery');
var picturesRouter = require('./routes/pictures');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/branch', branchRouter);
app.use('/statecity', statecityRouter);
app.use('/fooditem', fooditemRouter);
app.use('/batch', batchRouter);
app.use('/section', sectionRouter);
app.use('/student', studentRouter);
app.use('/adminlogin', adminloginRouter);
app.use('/admin', adminsRouter);
app.use('/employee', employeeRouter);
app.use('/delivery', deliveryRouter);
app.use('/pictures', picturesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Wake-up endpoint
app.get('/wake-up', (req, res) => {
  console.log('💤 Wake-up ping received at:', new Date().toISOString());
  res.status(200).json({
    status: 'awake',
    time: new Date().toISOString()
  });
});

// ============== KEEP ALIVE WITH AXIOS ==============
setInterval(() => {
  axios.get(process.env.backend, {
    timeout: 10000, // 10 second timeout
    headers: {
      'User-Agent': 'Keep-Alive-Service'
    }
  })
  .then((response) => {
    if (response.status === 200) {
      console.log('✅ Server kept awake - Status:', response.status);
      console.log('📡 Response time:', new Date().toISOString());
    } else {
      console.log('⚠️ Server responded with status:', response.status);
    }
  })
  .catch((error) => {
    if (error.code === 'ECONNABORTED') {
      console.log('❌ Wake-up failed: Request timeout');
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('❌ Wake-up failed - Status:', error.response.status);
      console.log('❌ Error data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('❌ Wake-up failed: No response received');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('❌ Wake-up failed:', error.message);
    }
  });
}, 14.5 * 60 * 1000); // 14.5 minutes

// Optional: Log when the server starts
console.log('🚀 Server started at:', new Date().toISOString());
console.log('⏰ Keep-alive service will ping every 14.5 minutes');

module.exports = app;