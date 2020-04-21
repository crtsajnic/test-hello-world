var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.get('/qr', function(req, res) {
	//if(req.query.code == '1234') {
	//	app.set('json spaces', 2);
	//	res.json({ amount: '30.52', date:'2020-04-10T07:15:00.000', title: 'QR CODE SAMPLE' });
	//} else {
	//	res.send('Code not found');
	//}
	
	var day = (Math.round((Math.random() * 31) + 1));
	if (day < 10) {
		day = '0' + day.toString();
	}
	
	res.json({ amount: ((Math.random() * 100) + 1).toFixed(2).toString(), date:'2020-04-' + day + 'T07:15:00.000', title: 'QR CODE SAMPLE' });
});


module.exports = app;
