'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.config();
var secretKey = process.env.JWT_SECRET_KEY;
var Authenticate = {
  verifyToken: function verifyToken(req, res, next) {
    var token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      res.status(401).send({ message: 'Unauthorized Access' });
    }

    _jsonwebtoken2.default.verify(token, secretKey, function (err, result) {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      }
      req.decoded = result;
      next();
    });
  },
  hashPassword: function hashPassword(paaword) {
    var salt = _bcryptNodejs2.default.genSaltSync(8);
    return _bcryptNodejs2.default.hashSync(password, salt);
  },
  filterUser: function filterUser(user) {
    var newUser = {};
    newUser.firstname = user.firstname;
    newUser.lastname = user.lastname;
    newUser.email = user.email;
    newUser.phone = user.phone;
    newUser.image = user.image;

    return newUser;
  },
  comparePassword: function comparePassword(password1, hashedPassword) {
    if (_bcryptNodejs2.default.compareSync(password1, hashedPassword)) {
      return true;
    }
    return false;
  }
};
exports.default = Authenticate;