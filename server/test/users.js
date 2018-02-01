import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../app';
import fakerObj from './helpers/userHelper';
import recipeObject from './helpers/recipesHelper';

const expect = chai.expect;
const request = supertest(app);

chai.use(chaiHttp);

let firstUserToken;
let secondUserToken;
let firstUserId;
let secondUserId;
let firstRecipeId;
let secondRecipeId;

describe('Auth Suite', () => {
  describe('Create User POST: /api/v1/users/signup', () => {
    it('should successfully create a new user 1 on successful registration', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(fakerObj.firstUser)
        .expect(201)
        .end((err, res) => {
          firstUserToken = res.body.token
          firstUserId = res.body.user.id
          expect(res.body.user.email).to.equal(fakerObj.firstUser.email);
          done();
        });
    });
    it('should successfully create a new user 2 on successful registration', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(fakerObj.usersInfo)
        .expect(201)
        .end((err, res) => {
          secondUserToken = res.body.token
          secondUserId = res.body.user.id
          expect(res.body.user.email).to.equal(fakerObj.usersInfo.email);
          done();
        });
    });
    it('(409 error) with duplicate email', (done) => {
      request
        .post('/api/v1/users/signup')
        .expect(409)
        .send(fakerObj.usersInfo)
        .end((err, res) => {
          expect(res.body.message)
            .to.equal(`User with email ${fakerObj.usersInfo.email} already exist`);
          done();
        });
    });
    it('should return an error when the signup form is missing a required field', (done) => {
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
  describe('User Login: /api/v1/users/signin', () => {
    it('should successfully log in a registered user', (done) => {
      request
        .post('/api/v1/users/signin')
        .send(fakerObj.usersInfo)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.user.email).to.equal(fakerObj.usersInfo.email);
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
          firstName: 'testusername3',
          lastName: 'testusername3',
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



// Add recipes test suite


describe('Add Recipe Suite', () => {
  describe('Create New Recipe POST: /api/v1/recipes', () => {
    it('should successfully create a new recipe for user one on successful', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: firstUserToken })
        .send(recipeObject.recipeOne)
        .end((err, res) => {
          if (err) return done(err);
          firstRecipeId = res.body.recipe.id;
          expect(res.status).to.equal(201)
          expect(res.body.message).to.equal('New recipe added');
          done();
        });
    });
    it('should successfully create a new recipe for user two on successful', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: secondUserToken })
        .send(recipeObject.recipe2)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          secondRecipeId = res.body.recipe.id;
          expect(res.body.message).to.equal('New recipe added');
          done();
        });
    });
    it('should return an error if there is a recipe with same title', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: firstUserToken })
        .send(recipeObject.recipeOne)
        .expect(409)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message)
            .to.equal('You already have a recipe with same title');
          done();
        });
    });
    it('should return an error if recipe title is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: firstUserToken })
        .send(recipeObject.recipeTwo)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          expect(res.body.message[0].msg)
            .to.equal('Title can\'t be less than 5 characters.');
          done();
        });
    });
    it('should return an error if recipe description is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: firstUserToken })
        .send(recipeObject.recipeThree)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          expect(res.body.message[0].msg)
            .to.equal('Description can\'t be less than 10 characters.');
          done();
        });
    });
    it('should return an error if recipe direction is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: firstUserToken })
        .send(recipeObject.recipeFour)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          expect(res.body.message[0].msg)
            .to.equal('Direction ccan\'t be less than 10 characters.');
          done();
        });
    });
    it('should return an error if recipe ingredients is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: firstUserToken })
        .send(recipeObject.recipeFive)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          expect(res.body.message[0].msg)
            .to.equal('ingredients can\'t be less than 10 characters.');
          done();
        });
    });
    it('should return an error if recipe image is empty', (done) => {
      request
        .post('/api/v1/recipes')
        .set({ authorization: firstUserToken })
        .send(recipeObject.recipeSix)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message[0].msg)
            .to.equal('Please, select an image.');
          done();
        });
    });
  });
});

// Delete recipes test suite

describe('Delete Recipes Suite', () => {
  describe('Delete Recipe DELETE: /api/v1/recipes/:id', () => {
    it('should return a 401 error on deleting a recipe added by another user',
      (done) => {
        request
          .delete(`/api/v1/recipes/${firstRecipeId}`)
          .set({ authorization: secondUserToken })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('You are not authorized to delete this recipe');
            done();
          });
      });
    it('should retuen an error if the there is no recipe with the ID supplied', (done) => {
      request
        .delete(`/api/v1/recipes/${99}`)
        .set({ authorization: firstUserToken })
        .expect(404)
        .end((err, res) => {
          if (res) return done(err);
          done();
        });
    });
    it('should successfully delete a recipe added by the authenticated user',
      (done) => {
        request
          .delete(`/api/v1/recipes/${firstRecipeId}`)
          .set({ authorization: firstUserToken })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal('Recipe deleted');
            done();
          });
      });
  });
});

// Update recipes test suite

describe('Update Recipes Suite', () => {
  describe('Delete Recipe DELETE: /api/v1/recipes/:id', () => {
    it('should update a recipe on successful',
      (done) => {
        request
          .put(`/api/v1/recipes/2`)
          .set({ authorization: secondUserToken })
          .send({
            title: 'Yam and rice',
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
    it('should retuen an error if the there is no recipe with the ID supplied', (done) => {
      request
        .put(`/api/v1/recipes/${99}`)
        .set({ authorization: firstUserToken })
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

// Get recipes test suite

describe('Get Recipes Suite', () => {
  describe('Get All Recipe GET: /api/v1/recipes', () => {
    it('should successfully get all recipes on successful', (done) => {
      request
        .get(`/api/v1/recipes`)
        .set({ authorization: firstUserToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Get a single recipes by ID GET: /api/v1/recipes/:id', () => {
    it('should successfully get a recipes on successful', (done) => {
      request
        .get(`/api/v1/recipes/${secondRecipeId}`)
        .set({ authorization: secondUserToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Get a single recipes by ID GET: /api/v1/recipes/:id', () => {
    it('should successfully get a recipes on successful', (done) => {
      request
        .get(`/api/v1/recipes??sort=upvotes&order=des`)
        .set({ authorization: secondUserToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('should return an error if recipe not added by the user GET: /api/v1/recipes/:id', () => {
    it('should return an error if recipe of id 55 is not found', (done) => {
      request
        .get(`/api/v1/recipes/55`)
        .set({ authorization: secondUserToken })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
});

describe('Get recipe added by the current user GET: /api/v1/users/recipes', () => {
  it('should return recipe of the current user', (done) => {
    request
      .get(`/api/v1/users/2/recipes`)
      .set({ authorization: secondUserToken })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it('should return error if the user ID supplied is not authenticated', (done) => {
    request
      .get(`/api/v1/users/98/recipes`)
      .set({ authorization: secondUserToken })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it('should return error if the user ID supplied is not a valid integer', (done) => {
    request
      .get(`/api/v1/users/h/recipes`)
      .set({ authorization: secondUserToken })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

// search recipes test suit

describe('Search Recipes Suite', () => {
  describe('Search all reacipes GET: /api/v1/recipes/:id', () => {
    it('should return success if search result is found', (done) => {
      request
        .post(`/api/v1/recipes/search?key=beans`)
        .set({ authorization: secondUserToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
  it('should return 404 if no result is returned', (done) => {
    request
      .post(`/api/v1/recipes/search?key=hkhkdhfkdhk`)
      .set({ authorization: secondUserToken })
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('No recipe found!!');
        if (err) return done(err);
        done();
      });
  });
});

// // Review recipes test suit

describe('Review Recipes Suite', () => {
  describe('review a reacipes POST: /api/v1/recipes/:id/reviews', () => {
    it('should return success if review is recieved', (done) => {
      request
        .post(`/api/v1/recipes/2/reviews`)
        .set({ authorization: secondUserToken })
        .send({ comment: 'this is the first commemt for this recipe yeah!!!!' })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    it('should return error if duplicate review comment by thesame user', (done) => {
      request
        .post(`/api/v1/recipes/2/reviews`)
        .set({ authorization: secondUserToken })
        .send({ comment: 'this is the first commemt for this recipe yeah!!!!' })
        .expect(409)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    it('should return error if review comment is less than 3 characters', (done) => {
      request
        .post(`/api/v1/recipes/2/reviews`)
        .set({ authorization: secondUserToken })
        .send({ comment: 't' })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return success fetched review successfully', (done) => {
      request
        .get(`/api/v1/recipes/2/reviews`)
        .set({ authorization: secondUserToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    it('should return error if requested for review for  non-existing recipe', (done) => {
      request
        .get(`/api/v1/recipes/76/reviews`)
        .set({ authorization: secondUserToken })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
});

// // Votes test suite

describe('Votes Suite', () => {
  describe('Upvote a reacipe POST: /api/v1/recipes/:id/upvotes', () => {
    it('should return success if upvote is recieved', (done) => {
      request
        .post(`/api/v1/recipes/2/upvotes`)
        .set({ authorization: secondUserToken })
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
        .set({ authorization: secondUserToken })
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
        .set({ authorization: secondUserToken })
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
        .set({ authorization: secondUserToken })
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
        .set({ authorization: secondUserToken })
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
        .set({ authorization: secondUserToken })
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
        .set({ authorization: secondUserToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Your down vote has been added');
          done();
        });
    });
  });
});

// Favourites test suite

describe('Favourite Suite', () => {
  describe('Add Favourite Reacipe POST: /api/v1/users/:id/favourites', () => {
    it('should return success when favourite recipe is added', (done) => {
      request
        .post(`/api/v1/users/${secondUserId}/favourites/${secondRecipeId}`)
        .set({ authorization: secondUserToken })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('Favourite recipe added');
          done();
        });
    });
  })
  describe('Favourite Suite', () => {
    it('should return success if a favourite recipe is fetched', (done) => {
      request
        .get(`/api/v1/users/2/favourites/${secondRecipeId}`)
        .set({ authorization: secondUserToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.favourites.recipeId).to.equal(secondRecipeId);
          done();
        });
    });
    it('should return success if all favourite recipes are fetched', (done) => {
      request
        .get(`/api/v1/users/2/favourites`)
        .set({ authorization: secondUserToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.favouriteRecipes).to.be.an('array');
          done();
        });
    });
    it('should success if a favourite recipe is removed', (done) => {
      request
        .delete(`/api/v1/users/2/favourites/${secondRecipeId}`)
        .set({ authorization: secondUserToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Favourite recipe removed');
          done();
        });
    });
    it('should return success if a favourite recipe is fetched', (done) => {
      request
        .get(`/api/v1/users/2/favourites/${secondRecipeId}`)
        .set({ authorization: secondUserToken })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('No favourite recipe found!!');
          done();
        });
    });
    // it('should return success if all favourite recipes are fetched', (done) => {
    //   request
    //     .get(`/api/v1/users/2/favourites`)
    //     .set({ authorization: secondUserToken })
    //     .expect(404)
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       expect(res.body.message).to.equal('No favourite(s) recipe found!!');
    //       done();
    //     });
    // });
    it('should return success when favourite recipe is added', (done) => {
      request
        .post(`/api/v1/users/${secondUserId}/favourites/${secondRecipeId}`)
        .set({ authorization: secondUserToken })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('Favourite recipe added');
          done();
        });
    });
    it('should remove a favourite recipe if it was already added', (done) => {
      request
        .post(`/api/v1/users/${secondUserId}/favourites/${secondRecipeId}`)
        .set({ authorization: secondUserToken })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Favourite recipe removed');
          done();
        });
    });
  });
})
