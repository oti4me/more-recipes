import express from 'express';
import recipes from '../controllers/recipes';
import Auth from '../middleware/jwtMiddleware';

const router = express.Router();

// get all user from database
router.get('/', recipes.getAllRecipes);

// get single user from database
router.get('/:id',  recipes.getSingleRecipe );


// Add recipe to database
router.post('/',  Auth.verifyToken, recipes.addRecipe );

// remove recipe from the database
router.delete('/:id',  recipes.deleteRecipe);

// update recipe route
router.put('/:id', Auth.verifyToken, recipes.updateRecipe);

// Add a review to a recipe
router.post('/:id/reviews', Auth.verifyToken, recipes.reviewRecipe);

// Upvote up a recipe
router.post('/:id/upvote', Auth.verifyToken, recipes.upvote);

// Downvote up a recipe
router.post('/:id/downvote', Auth.verifyToken, recipes.downvote);

export default router;