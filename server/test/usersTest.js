import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
const should = chai.should();
chai.use(chaiHttp);

describe("Users Athorization", () => {

  it('Signin Test', (done) => { // <= Pass in done callback
	  chai.request(app)
	  .get('/api/v1/users/signin')
	  .end( (err, res) => {
	     res.should.have.status(200);
	     res.should.be.json;
	     res.should.be.a('object');
	     done();
	  });
	  
	});

  it('Signup test', (done) => { // <= Pass in done callback
	  chai.request(app)
	  .get('/api/v1/users/signup')
	  .end( (err, res) => {
	     res.should.have.status(200);
	     res.should.be.json;
	     res.should.be.a('object');
	     done();
	  });
	  
	});

})
