import express from 'express';
import Users from '../controllers/users';
import recipes from '../controllers/recipes';
import favourites from '../controllers/favourites';
import Auth from '../middleware/jwtMiddleware';

const router = express.Router();

router.get('/', (req, res) => {
	res.json({ message: "Please consult the API document" });
});

router.get('/:id/profile', Auth.verifyToken, Users.profile);

router.get('/signin', Users.signup);
router.post('/signin', Users.signin);

router.get('/signup', Users.signup);
router.post('/signup', Users.signup);

router.get('/:id/recipes', recipes.getMyRecipes);

router.delete('/:id/favourites', favourites.removeFavourites);
router.get('/:id/favourites', favourites.getFavourites);
router.post('/:id/favourites', Auth.verifyToken, favourites.addFavourites);

export default router;