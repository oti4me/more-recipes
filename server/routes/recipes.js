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
router.delete('/:id', Auth.verifyToken, recipes.deleteRecipe);

// update recipe route Auth.verifyToken,
router.put('/:id', Auth.verifyToken, recipes.updateRecipe);

// Add a review to a recipe Auth.verifyToken,
router.post('/:id/reviews', Auth.verifyToken, recipes.reviewRecipe);
// Add a review to a recipe Auth.verifyToken,
// router.get('/:id/reviews', Auth.verifyToken, recipes.getRecipeReciews);

// Upvote up a recipe Auth.verifyToken,
router.post('/:id/upvotes', Auth.verifyToken, recipes.addUpvote);
// Get top upvoted recipe 
router.get('/?sort=upvotes&order=desc', Auth.verifyToken, recipes.getAllRecipes);

// Downvote up a recipe Auth.verifyToken,
router.post('/:id/downvotes', Auth.verifyToken,  recipes.addDownvote);
// Get top upvoted recipe 
router.get('/?sort=downvotes&order=desc', Auth.verifyToken, recipes.getAllRecipes);

export default router;