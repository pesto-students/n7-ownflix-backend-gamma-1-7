let envPath = '';
if (process.env.NODE_ENV === 'production') {
	envPath = './.env.production';
} else {
	envPath = './.env';
}
require('dotenv').config({ path: envPath });
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); // new
var bodyParser = require('body-parser'); //middleware
var cors = require('cors'); //middleware
const auth = require('./middlewares/auth.middleware');

// Connect to MongoDB database
const conn = mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true, //new url parser engine with port
	useUnifiedTopology: true, //maintinging statbe connection
	useFindAndModify: false, // update
	useCreateIndex: true, // for indexing
});

var app = express();

if (conn) {
	// console.log(process.env.NODE_ENV);

	var indexRouter = require('./routes/index');
	var usersRouter = require('./routes/users.route');
	var authRouter = require('./routes/auth.route');
	var movieRouter = require('./routes/movies.route');

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(cookieParser());
	// cors
	// app.use(function (req, res, next) {
	// 	res.header('Access-Control-Allow-Origin', '*');
	// 	res.header(
	// 		'Access-Control-Allow-Headers',
	// 		' Origin, X-Requested-With, Content-Type, Accept,x-api-key ,Authorization'
	// 	);
	// 	res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
	// 	console.log('cors');
	// 	next();
	// });
	app.use(cors());
	// directories for uploaded resources
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/uploads', express.static(process.env.UPLOAD_DIR));

	// middleware for all request
	if (process.env.ENV === 'production') {
		app.use(function (req, res, next) {
			// check auth client
			// console.log('prod');
			const xKey = req.headers['x-api-key'];
			if (process.env.X_API_KEY === xKey) {
				next();
			} else {
				next(createError(401));
			}
		});
	}

	// router module mapper
	app.use('/auth', authRouter);
	app.use('/', indexRouter);
	app.use('/users', usersRouter);
	app.use('/movies', movieRouter);

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
}
// routes main directory

module.exports = app;
