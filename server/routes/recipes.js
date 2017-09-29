import express from 'express';
import recipes from '../controllers/recipes';

const router = express.Router();

// get all user from database
router.get('/', (req, res) => {
		let data = recipes.getAllRecipes();
		res.json(data);
	} 
);

// get single user from database
router.get('/:id',  (req, res) =>{
	let single = recipes.getSingleRecipe(req.params.id);
	res.json(single);
});

// Add recipe to database
router.post('/',  (req, res) =>{
	let data = req.body;
	
	if(recipes.addRecipe(data)){
		// res.json(data);
		res.redirect('/api/recipes/');
	} else { res.json('Error Adding to Database, please try again later'); }
	
});

// remove recipe from the database
router.delete('/:id',  (req, res) =>{
	let data = recipes.deleteRecipe(req.params.id);
	res.json(data);
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
	let data = recipes.reviewRecipe( newData, req.params.id);
	if(data){
		res.json(data);
	} 
});


// favourite recipes routes
router.get('/favouriterecipes',  (req, res) =>{
	res.json({ single : recipes.favouriteRecipe()})
});
router.post('/favouriterecipes',  (req, res) =>{
	res.json({ single : recipes.favouriteRecipes(req.params.sort, req.params.order)})
});
router.delete('/:recipeId/favouriterecipe',  (req, res) =>{
	res.json({ single : recipes.addRecipe({})})
});
router.post('/',  (req, res) =>{
	res.json({ single : recipes.addRecipe({})})
});



router.post('/:sort/:order',  (req, res) =>{
	res.json({ single : recipes.search(req.params.sort, req.params.order)})
});

// router.post('/:id/review/',  (req, res) =>{
// 	res.json({ single : recipes.reviewRecipe({})})
// });




export default router;