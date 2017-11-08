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

describe("", function () {

	var data = {
		title: "Cassava cake",
		description: "Cassava cake",
		ingredients: "Cassava cake",
		image: "Cassava cake",
		direction: "Cassava cake",
		userId: 3
	};

	var data2 = {
		title: "Cassava cake",
		description: "Cassava cake",
		ingredients: "Cassava cake",
		image: "Cassava cake",
		direction: "Cassava cake",
		userId: 3
	};

	it('Add recipes test', function (done) {
		// <= Pass in done callback
		_chai2.default.request(_app2.default).post('/api/v1/recipes').send(data).end(function (err, res) {
			res.should.have.status(201);
			res.should.be.json;
			res.should.be.a('object');
			done();
		});
	});

	it('Update recipes test', function (done) {
		// <= Pass in done callback
		_chai2.default.request(_app2.default).post('/api/v1/recipes').send(data).end(function (err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.should.be.a('object');
			done();
		});
	});
});