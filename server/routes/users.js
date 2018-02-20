import express from 'express';
import { Users, Recipes, Favourites } from '../controllers';
import Auth from '../middleware/jwtMiddleware';

const router = express.Router();

router.get('/', (req, res) => {
	res.json({ message: "Please consult the API document" });
});

router.post('/signin', Users.signin);

router.post('/signup', Users.signup);

router.get('/:id/recipes', Auth.verifyToken, Recipes.getMyRecipes);

router.get('/:id/favourites', Auth.verifyToken, Favourites.getFavourites);
router
	.get('/:id/favourites/:recipeId',
	Auth.verifyToken, Favourites.getSingleFavourite);

router.post('/:id/favourites/:recipeId', Auth.verifyToken,
	Favourites.addFavourite
);

router.delete('/:id/favourites/:recipeId',
	Auth.verifyToken, Favourites.removeFavourite);

export default router;
