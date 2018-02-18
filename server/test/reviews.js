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

console.log(token)

chai.use(chaiHttp);

describe('Reviews Controller', () => {
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


  // Review recipes test suit

  describe('Review Recipes Suite', () => {
    describe('Review recipe POST: /api/v1/recipes/:id/reviews', () => {
      it('should return success if review is recieved', (done) => {
        request
          .post(`/api/v1/recipes/1/reviews`)
          .set({ authorization: token })
          .send({
            comment: 'this is the first commemt'
          })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.review.id).to.equal(1);
            done();
          });
      });
      it('should return a 409 error if duplicate review comment by same user',
        (done) => {
          request
            .post(`/api/v1/recipes/1/reviews`)
            .set({ authorization: token })
            .send({
              comment: 'this is the first commemt'
            })
            .expect(409)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body.message)
                .to
                .equal('Your already have a review with same content');
              done();
            });
        });
      it('should return error if review comment is less than 3 characters',
        (done) => {
          request
            .post(`/api/v1/recipes/2/reviews`)
            .set({ authorization: token })
            .send({ comment: 't' })
            .expect(400)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body.message[0].msg)
                .to
                .equal('Review comment too short.');
              done();
            });
        });
      it('should fetched recipe reviews successfully', (done) => {
        request
          .get(`/api/v1/recipes/1/reviews`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.reviews[0]).to.have.property('id');
            expect(res.body.reviews[0]).to.have.property('recipeId');
            expect(res.body.reviews[0]).to.have.property('userId');
            done();
          });
      });
      it('should return a 404 error if requested for review for  non-existing recipe',
        (done) => {
          request
            .get(`/api/v1/recipes/76/reviews`)
            .set({ authorization: token })
            .expect(404)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body.message).to.equal('No recipe with ID \'76\' ');
              done();
            });
        });

    });
  });
});
