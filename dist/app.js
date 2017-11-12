'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create express app
// Import dependencies

var app = (0, _express2.default)();

// import routes


app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
app.use((0, _expressValidator2.default)());
app.use('/api/v1', _api2.default);

app.use('/*', function (req, res) {
		res.end('Home page');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
});

// error handler
app.use(function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.send('error');
});

exports.default = app;