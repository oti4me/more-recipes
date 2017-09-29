"use strict"

import data from "../models/data";

class Recipes{

	constructor(recipes){
		this.recipes = recipes;
	}

	getAllRecipes(){
		return this.recipes;
	}

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

	reviewRecipe(data, id = 1){
		for(let i = 0; i < this.recipes.length; i++){
			if(this.recipes[i].id == id){
				this.recipes[i].reviews.push(data);
			}
		}

		return this.recipes;
	}

	search(sort, order){
		for(let i = 0; i < this.recipes.length; i++){
			if(this.recipes[i].upvote){
				this.recipes[i].reviews.push(data);
			}
		}
		return this.recipes;
	}
}

export default (new Recipes(data.recipes));