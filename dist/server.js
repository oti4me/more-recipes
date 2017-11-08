#!/usr/bin/env node
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get port from environment and store in Express.
 */

/**
 * Module dependencies.
 */

var port = process.env.PORT || '3000';
_app2.default.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

_app2.default.listen(port, function () {
  console.log('Server running in localhost 3000');
});