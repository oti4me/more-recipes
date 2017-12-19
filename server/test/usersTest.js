import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../app';
import fakerObj from './helpers/userHelper';
import recipeObject from './helpers/recipesHelper';


import models from '../models';
const { Users, Recipes } = models;

const expect = chai.expect;
const request = supertest(app);

// const should = chai.should();
chai.use(chaiHttp);

Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

Recipes.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

let token;

describe('Auth Suite', () => {
  describe('Create User POST: /api/v1/users/signup', () => {
    it('should successfully create a new user on successful registration', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(fakerObj.firstUser)
        .expect(201)
        .end((err, res) => {
          token = res.body.token
          expect(res.body.user.email).to.equal(fakerObj.firstUser.email);
          done();
        });
    });
    it('(409 error) with duplicate email', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(fakerObj.firstUser)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('should return an error when the signup form is missing a field', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(fakerObj.wrongUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('Login User: /api/v1/users/signin', () => {
    it('should successfully log in a registered user', (done) => {
      request
        .post('/api/users/signin')
        .send(fakerObj.firstUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return an error if the password field is empty', (done) => {
      request
        .post('/api/v1/users/signin')
        .send(fakerObj.wrongUser1)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return an error if the email field is empty', (done) => {
      request
        .post('/api/v1/users/signin')
        .send(fakerObj.wrongUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('(400 error) with invalid email format', (done) => {
      request
        .post('/api/v1/users/signup')
        .send({
          email: 'test',
          username: 'testusername3',
          password: 'testpassword',
          phone: '07069473974'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});

describe('Add Recipe Suite', () => {
  describe('Create New Recipe POST: /api/v1/recipes', () => {
    it('should successfully create a new recipe on successful', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeObject.recipeOne)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('New recipe added');
          done();
        });
    });
    it('should return an error if there is a recipe with same title', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeObject.recipeOne)
        .expect(409)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('You already have a recipe with same title');
          done();
        });
    });
    it('should return an error if recipe title is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeObject.recipeTwo)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return an error if recipe description is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeObject.recipeThree)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return an error if recipe direction is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeObject.recipeFour)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return an error if recipe ingredients is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeObject.recipeFive)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return an error if recipe image is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeObject.recipeSix)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});
