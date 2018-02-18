import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../app';
import db from '../models';
import {
  insertUserSeed,
  user1token,
  insertRecipeSeed,
} from './helpers/mockData';


const { Recipes } = db;

const expect = chai.expect;
const request = supertest(app);
let token = '';

chai.use(chaiHttp);

describe('Votes Controller', () => {
  before((done) => {
    Recipes.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
      .then(() => {
        insertUserSeed();
        insertRecipeSeed();
        token = user1token;
        done();
      });
  });


  // Votes test suite

  describe('Votes Suite', () => {
    describe('Upvote reacipe POST: /api/v1/recipes/:id/upvotes', () => {
      it('should return success if upvote is recieved', (done) => {
        request
          .post(`/api/v1/recipes/2/upvotes`)
          .set({ authorization: token })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('Your vote has been recorded');
            done();
          });
      });
      it('should remove the upvote of a user who has already upvoted', (done) => {
        request
          .post(`/api/v1/recipes/2/upvotes`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('Your vote has been removed');
            done();
          });
      });

    });
    describe('Down-Vote a reacipe POST: /api/v1/recipes/:id/downvotes', () => {
      it('should return success if downvote is recieved', (done) => {
        request
          .post(`/api/v1/recipes/2/downvotes`)
          .set({ authorization: token })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('Your downvote has been recorded');
            done();
          });
      });
      it('should remove the downvote of a user who has already downvoted', (done) => {
        request
          .post(`/api/v1/recipes/2/downvotes`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('Your downvote has been removed');
            done();
          });
      });
    });
    describe('Toggle-Vote a reacipe POST: /api/v1/recipes/:id/downvotes', () => {
      it('should return success if downvote is recieved', (done) => {
        request
          .post(`/api/v1/recipes/2/downvotes`)
          .set({ authorization: token })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('Your downvote has been recorded');
            done();
          });
      });
      it('should toggle from downvote to upvote', (done) => {
        request
          .post(`/api/v1/recipes/2/upvotes`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('Your vote has been added');
            done();
          });
      });
      it('should toggle from  from upvote to downvote', (done) => {
        request
          .post(`/api/v1/recipes/2/downvotes`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('Your down vote has been added');
            done();
          });
      });
    });
  });

});
