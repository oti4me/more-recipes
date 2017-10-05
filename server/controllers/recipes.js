"use strict"

// import Helpers from "../middlemare/jwtMiddleware";
import db from '../models';

class Recipes {

		/*
	* getAllRecipes function with params @req, @res
	*
	*/
		getAllRecipes(req, res) {
				// Get recipes based or query strings to return the most voted recipes
				if(req.query.sort && req.query.order){
					let order = req.query.order;

					if(req.query.sort = "upvotes"){
						if(order == "desc"){
							order = 'DESC';
						}else if(order == "asc"){
							order = 'ASC';
						}
						db.Recipes.findAll({ limit: 10, order: [['upvotes', order]]})
							.then((recipes) => {
									res.status(200).json({status: 200, data: recipes});
							})
							.catch(error => {
									res.status(500).json(error);
							})
					}else{
						// Get recipes based or query strings to return the least voted recipes
						if(order == "desc"){
							order = 'DESC';
						}else if(order == "asc"){
							order = 'ASC';
						}

						db.Recipes.findAll({ limit: 10, order: [['upvotes', order]]})
						.then((recipes) => {
								res.status(200).json({status: 200, data: recipes});
						})
						.catch(error => {
								res.status(500).json(error);
						})
					}
					
				// }
				
			}

				//get all recipes
				db.Recipes.findAll()
						.then((recipes) => {
								res.status(200).json({status: 200, data: recipes});
						})
						.catch(error => {
								res.status(500).json(error);
						})
		}

		/*
	* getSingleRecipes function with @params id, and a return type of array
	*
	*/
		getSingleRecipe(req, res) {
				db.Recipes.findById(req.params.id)
						.then((recipe) => {
								res.status(200).json({status: 200, data: recipe});
						})
						.catch(error => {
								res.status(500).json({status: 500, message: error.message});
						})
		}

		/*
	* addRecipe function with params @req, @res
	*
	*/
		addRecipe(req, res) {
				db
						.Recipes
						.create(req.body)
						.then((result) => {
								if (result) {
										res
												.status(201)
												.json({status: 201, message: "Recipe added"});
								} else {
										console.log("I cannot get anything");
										res
												.status(400)
												.json({status: 400, message: "no result returned"});
								}
						})
						.catch(error => {
								console.log("error geting into the database");
								res
										.status(500)
										.json({status: 500, message: error.message});
						})

		}

		/*
	* addRecipe function with params @req, @res
	*
	*/
		deleteRecipe(req, res) {

				db
						.Recipes
						.destroy({
								where: {
										id: req.params.id
								}
						})
						.then((result) => {
								if (result) {
										res
												.status(200)
												.json({message: "Data deleted"});
								}
						})
						.catch(err => {
								res
										.status(400)
										.json({message: err.message});
						});

		}

		updateRecipe(req, res) {

				db
						.Recipes
						.update(req.body, {
								where: {
										id: req.params.id
								}
						})
						.then((result) => {
								if (result) {
										res
												.status(200)
												.json({message: "Data Updated"});
								}
						})
						.catch(err => {
								res
										.status(400)
										.json({message: err.message});
						});

		}

		reviewRecipe(req, res) {

				db
						.Reviews
						.create(req.body)
						.then((result) => {
								res
										.status(200)
										.json({status: 200, data: result});
						})
						.catch(error => {
								res.json(error);
						})

		}

		getReviews(req, res) {

				db
						.Reviews
						.findAll({
								where: {
										recipeId: req.params.id
								}
						})
						.then((result) => {
								if (result) {
										res
												.status(200)
												.json({status: 200, data: result});
								}

						})
						.catch(error => {
								res.json(error);
						})

		}

		search(req, res) {

				db
						.Recipes
						.findAll({
								where: {
										id: req.params.id
								}
						})
						.then((result) => {
								if (result) {
										res
												.status(200)
												.json({message: "Data deleted"});
								}
						})
						.catch(err => {
								res
										.status(400)
										.json({message: err.message});
						});
		}
}

export default new Recipes();
//export default (new Recipes(db));