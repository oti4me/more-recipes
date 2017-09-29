"use strict"

import data from "../models/data";

class Recipes{

	/*
	* recipes constructor function with @params recipes and reviews
	*
	*/
	constructor(recipes, reviews){
		this.recipes = recipes;
		this.reviews = reviews;
	}

	/*
	* getAllRecipes function with no @params and a return type of array
	*
	*/
	getAllRecipes(){
		return this.recipes;
	}

	/*
	* getSingleRecipes function with @params id, and a return type of array
	*
	*/
	getSingleRecipe(id = 1){

		let single = {};
		for(let i = 0; i < this.recipes.length; i++){
			if(this.recipes[i].id == id){
				single = this.recipes[i];
			}
		}

		console.log(single);
		return single;

		// this.recipes.filter( value => {
		// 	if(value.id == id) //return this.recipes[i];
		// 		console.log(value)
		// });

	}

	/*
	* getAllRecipes function with no @params and a return type of array
	*
	*/
	addRecipe(data){
		if(this.recipes.push(data)){
			return true;
		}else return false;
	}

	deleteRecipe(id){
		for(let i = 0; i < this.recipes.length; i++){
			if(this.recipes[i].id == id){
				this.recipes.splice(i, 1);
			}
		}

		return this.recipes;
	}

	updateRecipe(data, id = 1){
		let { title, description, image } = data;
		for(let i = 0; i < this.recipes.length; i++){
			if(this.recipes[i].id == id){
				this.recipes[i].title = title;
				this.recipes[i].description = description;
				this.recipes[i].image = image;
			}
		}

		return this.recipesrecipes;
	}

	reviewRecipe(data1, id = 1){
		data1.recipeId = id;
		this.reviews.push(data1);
		
		return this.reviews;
	}

	search(sort, order){

		let sorted = [];

		for(let i = 0; i < this.recipes.length; i++){
			unSorted.push(this.recipes[i].upvote);
		}

		sorted = Array.sort(unSorted);

		return this.recipes;
	}
}

export default (new Recipes(data.recipes, data.reviews));