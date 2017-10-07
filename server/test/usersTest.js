import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
const should = chai.should();
chai.use(chaiHttp);

describe("Users Athorization", () => {
	const user = { email : "yes@gmail.com", password : "otighe"};
  it('Signin Test', (done) => { // <= Pass in done callback
	  chai.request(app)
		.get('/api/v1/users/signin')
		.send(users)
	  .end( (err, res) => {
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

})
