import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
const should = chai.should();
chai.use(chaiHttp);

describe("", () => {

  it('', (done) => { // <= Pass in done callback
	  chai.request(app)
	  .get('/api/v1/recipes')
	  .end( (err, res) => {
	     res.should.have.status(200);
	     res.should.be.json;
	     res.should.be.a('object');
	     done();
	  });
	  
	});

  it('', (done) => { // <= Pass in done callback
	  chai.request(app)
	  .get('/api/v1/recipes/1')
	  .end( (err, res) => {
	     res.should.have.status(200);
	     res.should.be.json;
	     res.should.be.a('object');
	     done();
	  });
	  
	});

})
