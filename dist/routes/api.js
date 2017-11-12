'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _recipes = require('./recipes');

var _recipes2 = _interopRequireDefault(_recipes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import indivdual routes
var router = _express2.default.Router();
/* GET home page. */
// imort express module
router.get('/', function (req, res) {
	res.json({ message: "this is a test message" });
});

/* GET user api. */
router.use('/users', _users2.default);

//  GET recipe api. 
router.use('/recipes', _recipes2.default);

exports.default = router;