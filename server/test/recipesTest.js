// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import supertest from 'supertest';
// import app from '../app';
// import recipeObject from './helpers/recipesHelper';

// import models from '../models';
// const { Recipes } = models;

// const expect = chai.expect;
// const request = supertest(app);

// // const should = chai.should();
// chai.use(chaiHttp);

// Recipes.destroy({
//   cascade: true,
//   truncate: true,
//   restartIdentity: true
// });

// let token = 

// describe('Add Recipe Suite', () => {
//   describe('Create New Recipe POST: /api/v1/recipes', () => {
//     it('should successfully create a new recipe on successful', (done) => {
// 			request
//         .post('/api/v1/recipes')
//         .set({ 'x-access-token': token })
//         .send(recipeObject.recipeOne)
//         .expect(201)
//         .end((err, res) => {
//           expect(res.body.recipes.message).to.equal('recipe added');
//           done();
//         });
//     });
//   });
// });


