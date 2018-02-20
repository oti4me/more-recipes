import express from 'express';
import { Recipes, Reviews, Votes, Search, Favourites } from '../controllers';
import Auth from '../middleware/jwtMiddleware';

const router = express.Router();
router.get('/toprecipes', Favourites.getMostFavourited);

// get all recipes from database
router.get('/', Recipes.getAllRecipes);

// get single recipe from database
router.get('/:id', Recipes.getSingleRecipe);

// Add recipe to database 
router.post('/', Auth.verifyToken, Recipes.addRecipe);

// remove recipe from the database
router.delete('/:id', Auth.verifyToken, Recipes.deleteRecipe);

// update recipe route
router.put('/:id', Auth.verifyToken, Recipes.updateRecipe);

// Add a review to a recipe 
router.post('/:id/reviews', Auth.verifyToken, Reviews.reviewRecipe);
// get all reviews for a recipe 
router.get('/:id/reviews', Reviews.getReviews);

// search for a recipe on the database
router.post('/search', Search.search);

// Vote up or down a recipe 
router.post('/:id/upvotes', Auth.verifyToken, Votes.upVotes);
router.post('/:id/downvotes', Auth.verifyToken, Votes.downVotes);

export default router;
