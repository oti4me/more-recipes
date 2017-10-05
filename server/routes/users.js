import express from 'express';
import Users from '../controllers/users';

const router = express.Router();

router.get('/', (req, res) => {
	res.json({message : "users route"});
});

router.get('/:id/profile', Users.profile);

router.get('/signin', Users.signup);
router.post('/signin', Users.signin);

router.get('/signup', Users.signup);
router.post('/signup', Users.signup);

router.get('/:id/recipes', Users.favourites);

export default router;