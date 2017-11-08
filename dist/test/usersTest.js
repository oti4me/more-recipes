'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe("Users Athorization", function () {
	var user = { email: "yes@gmail.com", password: "otighe" };
	it('Signin Test', function (done) {
		// <= Pass in done callback
		_chai2.default.request(_app2.default).get('/api/v1/users/signin').send(users).end(function (err, res) {
			res.should.have.status(200);
			//  res.should.be.json;
			//  res.should.be.a('object');
			done();
		});
	});

	// it('Signup test', (done) => { // <= Pass in done callback
	// 	const user = { email : "yes@gmail.com", password : "otighe"};
	//   chai.request(app)
	// 	.get('/api/v1/users/signup')
	// 	.send(users)
	//   .end( (err, res) => {
	//      res.should.have.status(200);
	//      res.should.be.json;
	//      res.should.be.a('object');
	//      done();
	//   });

	// });
});