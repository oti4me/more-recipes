import express from 'express';
import users from '../controllers/users';

const router = express.Router();

router.get('/', (req, res) => {
	res.json({message : "users route"});
});

router.get('/:id/profile', (req, res) => {
	res.json({message : users.getUserProfile(req.params.id)});
});


export default router;