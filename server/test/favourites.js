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

describe('Favourites Controller', () => {
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


  // Favourites test suite

  describe('Favourite Suite', () => {
    describe('Add Favourite Reacipe POST: /api/v1/users/:id/favourites',
      () => {
        it('should return success when favourite recipe is added', (done) => {
          request
            .post(`/api/v1/users/1/favourites/2`)
            .set({ authorization: token })
            .expect(201)
            .end((err, res) => {
              expect(res.body.message)
                .to
                .equal('Favourite recipe added');
              done();
            });
        });
      })
    describe('Get Favourite Suite', () => {
      it('should return success if a favourite recipe is fetched', (done) => {
        request
          .get(`/api/v1/users/1/favourites`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.favouriteRecipes[0]).to.have.property('id');
            expect(res.body.favouriteRecipes[0]).to.have.property('title');
            done();
          });
      });
      it('should return success if all favourite recipes are fetched', (done) => {
        request
          .get(`/api/v1/users/1/favourites/2`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.favourites).to.have.property('id');
            expect(res.body.favourites).to.have.property('userId');
            expect(res.body.favourites).to.have.property('recipeId');
            done();
          });
      });
      describe('Delete Favourite Reacipe DELETE: /api/v1/users/:id/favourites',
        () => {
          it('should return success when favourite recipe is added', (done) => {
            request
              .delete(`/api/v1/users/1/favourites/2`)
              .set({ authorization: token })
              .expect(200)
              .end((err, res) => {
                expect(res.body.message)
                  .to
                  .equal('Favourite recipe removed');
                done();
              });
          });
        })

    });
  })


});
