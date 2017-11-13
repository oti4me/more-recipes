"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _jwtMiddleware = require('../middleware/jwtMiddleware');

var _jwtMiddleware2 = _interopRequireDefault(_jwtMiddleware);

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

dotenv.config();
var secretKey = process.env.JWT_SECRET_KEY;

var Favourites = function () {
	function Favourites() {
		_classCallCheck(this, Favourites);
	}

	_createClass(Favourites, [{
		key: 'favourites',
		value: function favourites(req, res) {
			var id = req.params.id;
			if (_validate2.default.validateId(id)) {
				res.status(400).json({ status: 400, message: 'ID is not a valid interger' });
			}
			_models2.default.Favourites.findAll({ where: { userId: id } }).then(function (favourites) {
				if (favourites) {
					res.status(200).json({ status: 200, data: favourites });
				}
			}).catch(function (err) {
				res.status(500).json({ status: 500, message: err.message });
			});
		}
	}, {
		key: 'addFavourites',
		value: function addFavourites(req, res) {

			_models2.default.Favourites.create().then(function (favourites) {
				if (favourites) {
					res.status(201).json({ status: 20, token: token, favourites: favourites });
				}
			}).catch(function (err) {
				res.status(200).json({ status: 200, token: token, favourites: favourites });
			});
		}
	}]);

	return Favourites;
}();

exports.default = new Favourites();