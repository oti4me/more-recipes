// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import supertest from 'supertest';
// import app from '../app';
// import fakerObj from './helpers/user.helper';

// const expect = chai.expect;
// const request = supertest(app);
// describe("", () => {

// 	it('should successfully create a new user on successful registration', (done) => {
// 		request
// 			.post('/api/v1/users/signup')
// 			.send(fakerObj.users)
// 			.expect(201)
// 			.end((err, res) => {
// 				expect(res.body.user.email).to.equal(fakerObj.users.email);
// 				done();
// 			});
// 	});

//   it('All recipes test', (done) => { // <= Pass in done callback
// 	  chai.request(app)
// 	    .get('/api/v1/recipes')
// 	    .end( (err, res) => {
// 	      res.should.have.status(200);
// 	      res.should.be.json;
// 	      res.should.be.a('object');
// 	     done();
// 	    });
// 	});

//   it('Single recipe test', (done) => { // <= Pass in done callback
// 	  chai.request(app)
// 	  .get('/api/v1/recipes/1') 
// 	  .end( (err, res) => {
// 	     res.should.have.status(200);
// 	     res.should.be.json;
// 	     res.should.be.a('object');
// 	     done();
// 	  });
	  
// 	});

// })
