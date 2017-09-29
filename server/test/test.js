import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
const should = chai.should();
chai.use(chai);

describe("", () => {

  it('fails, as expected', (done) => { // <= Pass in done callback
	  chai.request(app)
	  .get('/api/vi/recipes')
	  .then( (res) => {
	     res.should.have.status(200);
	  })
	  .catch( (err)=>  {
	     throw err;
	  })
	});

})
