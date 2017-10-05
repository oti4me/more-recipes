import express from 'express';
import recipes from '../controllers/recipes';

const router = express.Router();

// get all user from database
router.get('/', recipes.getAllRecipes);

// get single user from database
router.get('/:id',  recipes.getSingleRecipe );


// Add recipe to database
router.post('/',  recipes.addRecipe );

// remove recipe from the database
router.delete('/:id',  recipes.deleteRecipe);

// update recipe in the database
router.put('/:id', recipes.updateRecipe);

// review recipe in the database
router.post('/:id/reviews',  recipes.reviewRecipe);
router.get('/:id/reviews',  recipes.reviewRecipe);

export default router;