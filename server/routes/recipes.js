import express from 'express';
import recipes from '../controllers/recipes';
import votes from '../controllers/votes';
import review from '../controllers/reviews';
import Auth from '../middleware/jwtMiddleware';


const router = express.Router();

// get all recipes from database
router.get('/', recipes.getAllRecipes);

// get single recipe from database
router.get('/:id',  recipes.getSingleRecipe );


// Add recipe to database 
router.post('/',  Auth.verifyToken, recipes.addRecipe );

// remove recipe from the database
router.delete('/:id', Auth.verifyToken, recipes.deleteRecipe);

// update recipe route
router.put('/:id', Auth.verifyToken, recipes.updateRecipe);

// Add a review to a recipe 
router.post('/:id/reviews', Auth.verifyToken, review.reviewRecipe);

router.post('/search', Auth.verifyToken, recipes.search);

// Add a review to a recipe 
router.get('/:id/reviews', Auth.verifyToken, review.getReviews);

// Vote up or down a recipe 
router.post('/:id/votes', Auth.verifyToken, votes.votes);

router.get('/:id/upvotes', Auth.verifyToken, votes.getUpVotes);

router.get('/:id/downvotes', Auth.verifyToken, votes.getDownVotes);

// Get top upvoted recipe 
router.get('/?sort=upvotes&order=desc', Auth.verifyToken, recipes.getAllRecipes);
// Get top downvotes recipe 
router.get('/?sort=downvotes&order=desc', Auth.verifyToken, recipes.getAllRecipes);

export default router;