import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../app';
import fakerObj from './helpers/userHelper';

import models from '../models';
const { Users } = models;

const expect = chai.expect;
const request = supertest(app);

// const should = chai.should();
chai.use(chaiHttp);

Users.destroy({
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


