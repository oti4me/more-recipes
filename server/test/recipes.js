import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../app';
import db from '../models';
import {
  insertUserSeed,
  user1token,
  user2token,
  insertRecipeSeed,
  validRecipe,
  recipeWithNoTitle,
  recipeWithNoDescription,
  recipeWithNoDirection,
  recipeWithNoIngredient
} from './helpers/mockData';


const { Recipes } = db;

const expect = chai.expect;
const request = supertest(app);
let token = '';
let token1 = '';

chai.use(chaiHttp);

describe('Recipes Controller', () => {
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
        token1 = user2token;
        done();
      });
  });

  describe('Create New Recipes POST: /api/v1/recipes', () => {
    it('should successfully create a new recipe', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(validRecipe)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201)
          expect(res.body.message).to.equal('New recipe added');
          done();
        });
    });
  });

  describe('Create New Recipes Validation POST: /api/v1/recipes', () => {
    it('should ereturn a 400 error with no recipe title', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeWithNoTitle)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'Title can\'t be less than 5 characters.'
            );
          done();
        });
    });
    it('should ereturn a 400 error with no recipe description', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeWithNoDescription)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'Description can\'t be less than 10 characters.'
            );
          done();
        });
    });
    it('should ereturn a 400 error with no recipe direction', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeWithNoDirection)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'Direction ccan\'t be less than 10 characters.'
            );
          done();
        });
    });
    it('should ereturn a 400 error with no recipe description', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: token })
        .send(recipeWithNoIngredient)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400)
          expect(res.body.message[0].msg)
            .to
            .equal(
            'ingredients can\'t be less than 10 characters.'
            );
          done();
        });
    });
  });


  // Get recipes test suite

  describe('Get Recipes Suite GET: /api/v1/recipes', () => {
    describe('Get All Recipe', () => {
      it('should successfully retrieve all recipes', (done) => {
        request
          .get(`/api/v1/recipes`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            expect(res.body.recipes[0].id).to.equal(7);
            if (err) return done(err);
            done();
          });
      });
    });
    describe('Get one recipe GET: /api/v1/recipes/:id', () => {
      it('should successfully get a recipe', (done) => {
        request
          .get(`/api/v1/recipes/2`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.recipe.id).to.equal(2);
            done();
          });
      });
      it('should return a 400 error if recipe of id 55 not found', (done) => {
        request
          .get(`/api/v1/recipes/55`)
          .set({ authorization: token })
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('No recipe with id 55');
            done();
          });
      });
    });
  });


  // Update recipes test suite

  describe('Update Recipes PUT: /api/v1/recipes', () => {
    describe('Update Recipe', () => {
      it('should update a recipe on successful',
        (done) => {
          request
            .put(`/api/v1/recipes/2`)
            .set({ authorization: token })
            .send({
              title: 'rice and dodo',
              description: 'Yam and beans and rice',
              direction: 'Yam and beans and rice',
              ingredients: 'Yam and beans and rice',
              imageUrl: 'image/img.jpg'
            })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body.message).to.equal('Recipe Updated');
              done();
            });
        });
      it('should retuen an error if the there is no recipe with the id supplied', (done) => {
        request
          .put(`/api/v1/recipes/${99}`)
          .set({ authorization: token })
          .send({
            title: 'Yam and rice',
            description: 'Yam and beans and rice',
            direction: 'Yam and beans and rice',
            ingredients: 'Yam and beans and rice',
            imageUrl: 'image/img.jpg'
          })
          .expect(404)
          .end((err, res) => {
            if (res) return done(err);
            expect(res.body.message).to.equal('Not found');
            done();
          });
      });
    });
  });

  describe(`Get recipes added by the authenticated user GET: /api/v1/users/recipes`,
    () => {
      it('should return recipe of the current user', (done) => {
        request
          .get(`/api/v1/users/1/recipes`)
          .set({ authorization: token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.recipes[0].id).to.equal(7);
            done();
          });
      });
      it('should return a 400 error if the user ID supplied is not authenticated',
        (done) => {
          request
            .get(`/api/v1/users/98/recipes`)
            .set({ authorization: token })
            .expect(401)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body.message)
                .to
                .equal('User id supplied is not authenticated');
              done();
            });
        });
      it('should return error if the user ID supplied is not a valid integer',
        (done) => {
          request
            .get(`/api/v1/users/h/recipes`)
            .set({ authorization: token })
            .expect(400)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body.message)
                .to
                .equal('User id must be a valid integer');
              done();
            });
        });
    });

  // Delete recipes test suite

  describe('Delete Recipes Suite DELETE: /api/v1/recipes', () => {
    describe('Delete User Recipe', () => {
      it('should successfully delete a recipe added by the authenticated use',
        (done) => {
          request
            .delete(`/api/v1/recipes/1`)
            .set({ authorization: token })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body.message).to.equal('Recipe deleted');
              done();
            });
        });
    });
    describe('Delete User Recipe Validation DELETE: /api/v1/recipes/:id',
      () => {
        it(`should return a 403 error on 
        deleting a recipe added by another user`,
          (done) => {
            request
              .delete(`/api/v1/recipes/3`)
              .set({ authorization: token })
              .expect(403)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message)
                  .to
                  .equal('You don\'t have permision to delete this recipe');
                done();
              });
          });
      });
    it('should retuen a 404 error if no recipe with the ID supplied',
      (done) => {
        request
          .delete(`/api/v1/recipes/${99}`)
          .set({ authorization: token })
          .expect(404)
          .end((err, res) => {
            if (res) return done(err);
            expect(res.body.message)
              .to
              .equal('Not found');
            done();
          });
      });
  });

});
