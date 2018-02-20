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

describe('Search Controller', () => {
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

  // search recipes test suit

  describe('Search Recipes Suite', () => {
    describe('Search reacipes GET: /api/v1/recipes/:id', () => {
      it('should return 200 success if search result(s) is returned', (done) => {
        request
          .post(`/api/v1/recipes/search?key=rice`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            console.log(res.body);
            if (err) return done(err);
            expect(res.body.recipes[0].id).to.equal(1);
            expect(res.body.recipes[0].title).to.equal('Fried Rice');
            done();
          });
      });
    });
    it('should return 404 if no search result is returned', (done) => {
      request
        .post(`/api/v1/recipes/search?key=hkhkdhfkdhk`)
        .set({ authorization: token })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('No recipe found!!');
          if (err) return done(err);
          done();
        });
    });
  });

});
