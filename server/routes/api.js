import express from 'express'

import users from './users';
import recipes from './recipes';
// import index from './index';

// import users from './routes/api';

const router = express.Router();
/* GET home page. */
router.get('/', (req, res) => {
	res.json({ message : "this is a test message"});
});

/* GET user api. */
router.use('/users', users);

//  GET recipe api. 
router.use('/recipes', recipes);

export default router;