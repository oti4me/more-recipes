'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
	res.json({ message: "users route" });
});

router.get('/:id/profile', _users2.default.profile);

router.get('/signin', _users2.default.signup);
router.post('/signin', _users2.default.signin);

router.get('/signup', _users2.default.signup);
router.post('/signup', _users2.default.signup);

router.get('/:id/recipes', _users2.default.favourites);
router.post('/:id/recipes', _users2.default.favourites);

exports.default = router;