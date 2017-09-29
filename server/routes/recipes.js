import express from 'express';
import recipes from '../controllers/recipes';

const router = express.Router();

// get all user from database
router.get('/', (req, res) => {
		let data = recipes.getAllRecipes();
		res.status(200).json(data);
	} 
);

// get single user from database
router.get('/:id',  (req, res) =>{
	let single = recipes.getSingleRecipe(req.params.id);
	res.status(200).json({ status: 200, data : single});
});

// Add recipe to database
router.post('/',  (req, res) =>{
	let data = req.body;
	
	if(recipes.addRecipe(data)){
		// res.json(data);
		res.redirect('/api/recipes/');
	} else { res.status(500).json('Error Adding to Database, please try again later'); }
	
});

// remove recipe from the database
router.delete('/:id',  (req, res) =>{
	let data = recipes.deleteRecipe(req.params.id);
	res.status(200).json({ status: 200, data : data});
});

// update recipe in the database
router.put('/:id',  (req, res) =>{
	let newData = req.body;
	let data = recipes.updateRecipe( newData, req.params.id);
	if(data){
		res.json(data);
	} 
});

// review recipe in the database
router.post('/:id/review',  (req, res) =>{
	let newData = req.body;
	let reviews = recipes.reviewRecipe( newData, req.params.id);
	if(reviews){
		res.status(200).json({ status: 200, data : reviews});
	} 
});

// favourite recipes routes
router.get('/favouriterecipes',  (req, res) =>{
	res.status(200).json({ status: 200, data : recipes.favouriteRecipe()})
});

// router.post('/favouriterecipes',  (req, res) =>{
// 	let data = recipes.favouriteRecipes(req.params.sort, req.params.order)
// 	res.status(200).json({ single : })
// });

router.delete('/:recipeId/favouriterecipe',  (req, res) =>{
	res.status(200).json({ single : recipes.addRecipe({})})
});

router.post('/',  (req, res) =>{
	res.status(200).json({status: 200, data : recipes.addRecipe({})})
});

// router.post('/:id/review/',  (req, res) =>{
// 	res.json({ single : recipes.reviewRecipe({})})
// });

export default router;