import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../app';
import db from '../models';
import {
  insertUserSeed,
  validUser,
  userWithNoEmail,
  userWithNoFirstName,
  userWithNoLastName,
  userWithNoPassword
} from './helpers/mockData';


const { Users } = db;

const expect = chai.expect;
const request = supertest(app);

chai.use(chaiHttp);

describe('Users Controller', () => {
  before((done) => {
    Users.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
      .then(() => {
        insertUserSeed();
        done();
      });
  });

  describe('Create User POST: /api/v1/users/signup', () => {
    it('should successfully create a new user', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(validUser)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.user.email).to.equal(validUser.email);
          done();
        });
    });
  });

  describe('Create User Validation POST: /api/v1/users/signup', () => {
    it('should return 409 on duplicate email', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(validUser)
        .expect(409)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message)
            .to
            .equal('User with email adamsmith@yahoo.com already exist');
          done();
        });
    });
    it('should return 400 if missing email', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(userWithNoEmail)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message[0].msg)
            .to
            .equal('Enter a valid email address.');
          done();
        });
    });
    it('should return 400 if missing firstName', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(userWithNoFirstName)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message[0].msg)
            .to
            .equal(
            'First name can\'t be less than 3 or more than 25 characters and must not contain numbers or spaces.'
            );
          done();
        });
    });
    it('should return 400 with missing lastName', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(userWithNoLastName)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message[0].msg)
            .to
            .equal(
            'Last name can\'t be less than 3 or more than 25 characters and must not contain numbers or spaces.'
            );
          done();
        });
    });
  });


  describe('Signin user POST: /api/v1/users/signin', () => {
    it('should successfully log in a registered user', (done) => {
      request
        .post('/api/v1/users/signin')
        .send(validUser)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.user.email).to.equal(validUser.email);
          done();
        });
    });
    it('should return a 400 error if password field is empty', (done) => {
      request
        .post('/api/v1/users/signin')
        .send(userWithNoPassword)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message[0].msg)
            .to
            .equal('Password can\'t be empty.');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return a 400 error if email field is empty', (done) => {
      request
        .post('/api/v1/users/signin')
        .send(userWithNoEmail)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message[0].msg)
            .to
            .equal('Enter a valid email address.');
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

});
