import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
const should = chai.should();
chai.use(chaiHttp);

describe("", () => {

	const data = {
		title : "Cassava cake",
		description : "Cassava cake",
		ingredients : "Cassava cake",
		image : "Cassava cake",
		direction : "Cassava cake",
		userId : 3
	}

	const data2 = {
		title : "Cassava cake",
		description : "Cassava cake",
		ingredients : "Cassava cake",
		image : "Cassava cake",
		direction : "Cassava cake",
		userId : 3
	}

  it('Add recipes test', (done) => { // <= Pass in done callback
	  chai.request(app)
		.post('/api/v1/recipes')
		.send(data)
	  .end( (err, res) => {
	     res.should.have.status(201);
	     res.should.be.json;
	     res.should.be.a('object');
	     done();
	  });
	  
	});

  it('Update recipes test', (done) => { // <= Pass in done callback
	  chai.request(app)
		.post('/api/v1/recipes')
		.send(data)
	  .end( (err, res) => {
	     res.should.have.status(200);
	     res.should.be.json;
	     res.should.be.a('object');
	     done();
	  });
	  
	});

})
