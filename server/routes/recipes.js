import express from 'express';
import { recipes, reviews, votes, search, favourites } from '../controllers';
import Auth from '../middleware/jwtMiddleware';

const router = express.Router();
router.get('/toprecipes', favourites.getMostFavourited);

// get all recipes from database
router.get('/', recipes.getAllRecipes);

// get single recipe from database
router.get('/:id', recipes.getSingleRecipe);

// Add recipe to database 
router.post('/', Auth.verifyToken, recipes.addRecipe);

// remove recipe from the database
router.delete('/:id', Auth.verifyToken, recipes.deleteRecipe);

// update recipe route
router.put('/:id', Auth.verifyToken, recipes.updateRecipe);

// Add a review to a recipe 
router.post('/:id/reviews', Auth.verifyToken, reviews.reviewRecipe);
// get all reviews for a recipe 
router.get('/:id/reviews', reviews.getReviews);

// search for a recipe on the database
router.post('/search', search.search);

// Vote up or down a recipe 
router.post('/:id/upvotes', Auth.verifyToken, votes.upVotes);
router.post('/:id/downvotes', Auth.verifyToken, votes.downVotes);

export default router;
