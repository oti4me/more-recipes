import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chai);

describe("", function() {

  it('fails, as expected', function(done) { // <= Pass in done callback
	  chai.request(app)
	  .get('/')
	  .then(function (res) {
	     expect(res).to.have.status(200);
	  })
	  .catch(function (err) {
	     throw err;
	  })
	});

  it("", function() {
  	chai.request(app)
  		.get('/');
    assert.equal(aritGeo([1,2,3,4,5]), "Arithmetic");
  }); 
})
