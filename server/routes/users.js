import express from 'express';
import Users from '../controllers/users';
import recipes from '../controllers/recipes';
import Auth from '../middleware/jwtMiddleware';

const router = express.Router();

router.get('/', (req, res) => {
	res.json({message : "Please consult the API document"});
});

router.get('/:id/profile', Auth.verifyToken, Users.profile);

router.get('/signin', Users.signup);
router.post('/signin', Users.signin);

router.get('/signup', Users.signup);
router.post('/signup', Users.signup);

router.get('/:id/myrecipes', recipes.getMyRecipes);

router.delete('/:id/recipes', recipes.removeFavourites);
router.get('/:id/recipes', Auth.verifyToken, recipes.getFavourites);
router.post('/:id/recipes', Auth.verifyToken, recipes.addFavourites);

export default router;