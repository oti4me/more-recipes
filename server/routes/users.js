import express from 'express';
import { users, recipes, favourites } from '../controllers';
import Auth from '../middleware/jwtMiddleware';

const router = express.Router();

router.get('/', (req, res) => {
	res.json({ message: "Please consult the API document" });
});

router.get('/signin', users.signup);
router.post('/signin', users.signin);

router.get('/signup', users.signup);
router.post('/signup', users.signup);

router.get('/:id/recipes', Auth.verifyToken, recipes.getMyRecipes);

router.get('/:id/favourites', Auth.verifyToken, favourites.getFavourites);
router
	.get('/:id/favourites/:recipeId',
	Auth.verifyToken, favourites.getSingleFavourite);

router.post('/:id/favourites/:recipeId', Auth.verifyToken, favourites.addFavourite);

router.delete('/:id/favourites/:recipeId',
	Auth.verifyToken, favourites.removeFavourite);

export default router;