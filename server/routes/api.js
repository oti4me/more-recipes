// imort express module
import express from 'express'

//import indivdual routes
import users from './users';
import recipes from './recipes';

const router = express.Router();
/* GET home page. */
router.get('/', (req, res) => {
	res.json({
		message: "Please specify an appropriate route on your api document"
	});
});

/* GET user api. */
router.use('/users', users);

//  GET recipe api. 
router.use('/recipes', recipes);

export default router;