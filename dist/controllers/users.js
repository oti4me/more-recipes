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

var Users = function () {
	function Users() {
		_classCallCheck(this, Users);
	}

	_createClass(Users, [{
		key: 'signup',
		value: function signup(req, res) {

			_validate2.default.validateSignup(req, res);
			var errors = req.validationErrors();
			if (errors) {
				res.json(400).send({ errors: errors });
				return;
			} else {
				var _req$body = req.body,
				    firstname = _req$body.firstname,
				    lastname = _req$body.lastname,
				    email = _req$body.email,
				    phone = _req$body.phone,
				    password = _req$body.password;

				_models2.default.Users.find({
					where: {
						email: email
					}
				}).then(function (user) {
					if (user) {
						res.status(409).json({
							message: "User with email '" + email + "' already exists",
							status: 409
						});
					} else {

						_models2.default.Users.create({
							firstname: firstname, lastname: lastname, email: email, phone: phone, password: password
						}).then(function (user) {
							if (user) {
								var jwtData = {
									firstname: user.firstname.trim(),
									lastname: user.lastname.trim(),
									email: user.email.trim(),
									userId: user.id,
									phone: user.phone
								};

								var _token = _jsonwebtoken2.default.sign(jwtData, secretKey, { expiresIn: 86400 });
								user = _jwtMiddleware2.default.filterUser(user);
								res.status(201).json({ status: 201, token: _token, user: user });
							}
						}).catch(function (error) {
							res.status(400).json({
								message: 'Bad request',
								errors: error
							});
						});
					}
				}).catch(function (error) {
					res.status(500).json(error);
				});
			}
		}
	}, {
		key: 'signin',
		value: function signin(req, res) {
			_validate2.default.validateLogin(req, res);
			var errors = req.validationErrors();
			if (errors) {
				res.json(400).send({ errors: errors });
				return;
			} else {
				var _req$body2 = req.body,
				    email = _req$body2.email,
				    password = _req$body2.password;

				_models2.default.Users.findOne({ where: { email: email } }).then(function (user) {
					if (user && password && _jwtMiddleware2.default.comparePassword(password, user.password)) {
						var _token2 = _jsonwebtoken2.default.sign({
							firstname: user.firstname,
							lastname: user.lastname,
							email: user.email,
							userId: user.id
						}, secretKey, { expiresIn: 86400 });

						user = _jwtMiddleware2.default.filterUser(user);
						res.status(200).json({ status: 200, token: _token2, user: user });
					}

					res.status(401).json({ errors: { message: 'Failed to authenticate user' } });
				}).catch(function (error) {
					res.status(500).json({ error: error });
				});
			}
		}
	}, {
		key: 'profile',
		value: function profile(req, res) {
			_models2.default.Users.findById().then(function (user) {
				if (user) {
					res.json(user);
				}
			}).catch(function (err) {
				res.status(500).json({ error: error });
			});
		}
	}, {
		key: 'favourites',
		value: function (_favourites) {
			function favourites(_x, _x2) {
				return _favourites.apply(this, arguments);
			}

			favourites.toString = function () {
				return _favourites.toString();
			};

			return favourites;
		}(function (req, res) {
			_models2.default.Favourites.findAll({ where: { userId: req.params.id } }).then(function (favourites) {
				if (favourites) {
					res.status(200).json({ status: 200, token: token, favourites: favourites });
				}
			}).catch(function (err) {
				res.status(200).json({ status: 200, token: token, favourites: favourites });
			});
		})
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

	return Users;
}();

exports.default = new Users();