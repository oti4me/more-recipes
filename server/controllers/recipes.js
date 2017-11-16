"use strict"
import path from 'path';
import jwt_decode from 'jwt-decode';

import validate from '../middleware/validate';
import db from '../models';

/**
 * 
 * 
 * @class Recipes
*/
class Recipes {

  /**
   * A method for a user to get all recipes in the collection
   * 
   * @returns {object} insertion error messages object or success message object
   * @param {object} request 
   * @param {object} reponse 
   * @memberof Recipes
  */
  getAllRecipes(request, reponse) {
    // Get recipes based or query strings to return the most voted recipes
    let limit = 6;   // number of records per page
    let offset = 0;

    if (request.query.sort && request.query.order) {
      let order = request.query.order;
      if (request.query.sort === 'upvotes') {
        if (order === 'desc') {
          order = 'DESC';
        } else if (order === 'asc') {
          order = 'ASC';
        }
        db.Recipes.findAll({
            imit,
            offset,
            order: [
              ['upvotes', order]
            ]
          })
          .then((recipes) => {
            reponse.status(200).json({status: 200, recipes: recipes});
          })
          .catch(error => {
            reponse.status(500).json(error);
          })
      } else {
        // Get recipes based or query strings to return the least voted recipes
        if (order === 'desc') {
          order = 'DESC';
        } else if (order === 'asc') {
          order = 'ASC';
        }
        db.Recipes.findAll({
            limit,
            offset,
            order: [
              ['upvotes', order]
            ]
          })
          .then((recipes) => {
            reponse.status(200).json({status: 200, recipes: recipes});
          })
          .catch(error => {
            reponse.status(500).json(error);
          })
      }
    }

    //get all recipes
    db.Recipes.findAndCountAll()
    .then((data) => {
      let page = request.body.page ? request.body.page : 1;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      db.Recipes.findAll({
        limit,
        offset,
        order: [
              ['id', 'DESC']
            ]
      })
      .then((recipes) => {
        if(recipes){
          reponse.status(200).json({status: 200, recipes, pages });
        }else{
          reponse.status(404).json({status: 404, message: "No recipe found"});
        }
      })
      .catch(error => {
        reponse.status(500).json(error);
      })
    })
  }

 /**
  * A method get a single recipe base on recipe ID
  * @returns {object} insertion error messages object or success message object
  * @param {object} request 
  * @param {object} reponse 
  * @memberof Recipes
*/
 getSingleRecipe(request, reponse) {
    const id = request.params.id;
    if(validate.validateId(id)){ 
      db.Recipes.findById(id)
        .then((recipe) => {
          if(recipe){
            reponse.status(200).json({status: 200, recipe });
          }else{
            reponse.status(400).json({status: 404, message: "Recipe with id '" + id + "' not found"});
          }          
        })
        .catch(error => {
          reponse.status(500).json({status: 500, message: error.message});
        })
    }else{
      reponse.status(400).json({message: `Id "${id}" is not a valid integer` });
    }
  }

 /**
  * A method to get recipes added by a user based on user ID
  * 
  * @returns {object} insertion error messages object or success message object
  * @param {object} request 
  * @param {object} reponse 
*/
 getMyRecipes(request, reponse) {
    const id = request.params.id;
    const userId = validate.getUserId(request, reponse);
    if(validate.validateId(id) && validate.validateId(userId)){ 
      let limit = 6;   // number of records per page
      let offset = 0;
      db.Recipes.findAndCountAll({ 
        where : { 
            userId : id
          }
        })
      .then((recipesCount) => {
        if(!recipesCount){
          return reponse.status(400).json({status: 400, message: "No recipe return for this user"});
        }
        let page = request.body.page ? request.body.page : 1; // page number
        let pages = Math.ceil(recipesCount.count / limit);
        offset = limit * (page - 1);

        db.Recipes.findAll({ 
          where : { 
            userId : id
          },
          limit: limit,
          offset: offset,
          order: [
              ['id', 'DESC']
            ]
        })
          .then((recipes) => {
            if(recipes){
              reponse.status(200).json({status: 200, recipes, pages});
            }        
          })
        })
        .catch(err =>{
          reponse.status(500).json({status: 500, message: err.message});
        });
    }else{
      reponse.status(400).json({message: `Recipe Id and User ID must be a valid integer` });
    }
  }

 /**
  * A method add recipe to the collection
  *
  * @returns {object} insertion error messages object or success message object
  * @param {object} request 
  * @param {object} reponse 
  * @memberof Recipes
*/
  addRecipe(request, reponse) {
    const userId = validate.getUserId(request, reponse);
    const { title, direction, description, image, ingredients } = request.body;
    if(!validate.validateId(userId)){
      return reponse.status(400).json({ status : 400, message : 'User Id is invalid' });
    }
    validate.validateAddRecipes(request, reponse);
    var errors = request.validationErrors();
    if (errors) {
      return reponse.status(400).json({ status : 400, message : errors });
    } else {
      let data = {
        title,
        direction,
        description,
        image,
        ingredients,
        userId
      }
      db.Recipes.create(data)
        .then((reponseult) => {
          if (reponseult) {
            return reponse.status(201).json({status: 201, message: "New recipe added"});
          }
        })
        .catch(error => {
          return reponse.status(500).json({status: 500, message: error.message});
        })
    }
  }

/**
 * A method that allows a user to delete recipes he or she added to the recipe collection
 * 
 * @returns {object} insertion error messages object or success message object
 * @param {object} request 
 * @param {object} reponse 
 * @memberof Recipes
*/
deleteRecipe(request, reponse) {
  const userId = validate.getUserId(request, reponse);
  const id = request.params.id;
  if(validate.validateId(id) && validate.validateId(userId)){ 
    db.Recipes.findOne({
      where : {
        id,
        userId
      }
    })
    .then(recipe => {
      if(recipe){
        db.Recipes.destroy({
          where: {
            id: recipe.id
          }
        })
        .then((reponseponse) => {
          if (reponseponse) {
            reponse.status(200).json({ status : 200, message: "Recipe deleted"});
          }
        })
        .catch(err => {
          reponse.status(500).json({message: err.message});
        });
        } else{
          reponse.status(400).json({ status : 401, message: 'You is not authorised to delete this recipe'});
        }  
      }); 
    }else{
      reponse.status(400).json({message: `User ID and recipe ID must be a valid integer` });
    }
  }
/**
 * A method that allows a user to update recipes he added to the collection
 * 
 * @returns {object} insertion error messages object or success message object
 * @param {object} request 
 * @param {object} reponse 
 * @memberof Recipes
*/
updateRecipe(request, reponse) {
    const id = request.params.id;
    const userId = validate.getUserId(request, reponse);   
    var errors = request.validationErrors();
    if (errors) {
      return reponse.status(400).json({ status : 400, message : errors });
    } else {
      if(validate.validateId(id) && validate.validateId(userId)){ 
        db.Recipes.findOne({
          where : {
            id, userId 
          }
        })
        .then(recipe => {
          if(recipe){
            db.Recipes.update(request.body, {
              where: {
                id: recipe.id
              }
            })
            .then((reponseponse) => {
              if (reponseponse) {
                reponse.status(200).json({message: "Recipe Updated"});
              }
            })
            .catch(err => {
              reponse.status(500).json({message: err.message});
            });
          }
          else{
            reponse.status(401).json({ status : 401, message: "you are not authorised to update this recipe"});
          }
        })
      }else{
        reponse.status(400).json({ status : 400, message : 'user ID and recipe ID must be a valid integer' });
      }
      }
    
  }
/**
 * A method that allows a user to review recipes on the collection
 * 
 * @returns {object} insertion error messages object or success message object
 * @param {object} request 
 * @param {object} reponse 
 * @memberof Recipes
*/
reviewRecipe(request, reponse) {
    const recipeId = request.params.id
    const { comment } = request.body;
    const userId = validate.getUserId(request, reponse);  
    validate.validateReview(request, reponse);
    var errors = request.validationErrors();
    if (errors) {
      return reponse.status(400).json({ status : 400, message : errors });
    }
    db.Reviews.create({
      recipeId, userId, comment
    })
    .then((reponseult) => {
      reponse.status(200).json({ status: 200, data: reponseult});
    })
    .catch(error => {
      reponse.status(500).json({ status : 500, message : error.message });
    })
  }
/**
 * A method that allows the user to get list of reviews for a particular recipe
 * 
 * @returns {object} insertion error messages object or success message object
 * @param {object} request 
 * @param {object} reponse 
 * @memberof Recipes
*/
getReviews(request, reponse) {
    const id = request.params.id;
    if(!validate.validateId(id)){
      request.status(400).json({ status : 400, message : "Id is not a valid integer"});
    }
    db.Reviews.findAll({
      where: {
        ecipeId: id
      }
    })
    .then((reviews) => {
      if (reviews) {
        reponse.status(200).json({ status: 200, reviews});
      }
      else{
        reponse.status(404).json({ status: 404, message: 'No review found for this recipe'});
      }
    })
    .catch(error => {
      reponse.status(500).json({ status : 500, message : error.message });
    })
  }
/**
 * A method that allows the user to upvote/like a recipe
 * 
 * @returns {object} insertion error messages object or success message object
 * @param {object} request 
 * @param {object} reponse 
 * @memberof Recipes
*/
addUpvote(request, reponse) {
    const userId = validate.getUserId(request, reponse);  
    const recipeId = request.params.id;
    const vote = request.body.vote;
    if(validate.validateId(userId) && validate.validateId(recipeId)) {
      return reponse.status(400).json({ status : 400, message : 'user ID or Recipe ID is invalid' });
    }
    db.Votes.findOne({
      where: {
        recipeId,
        userId
      }
    }).then(result => {
      if(result){
        return reponse.status(400).json({ status : 400, message : 'Already Votted' });
      }
      db.Recipes.findOne({
        where: {
          recipeId
        }
      })
      .then(recipe =>{
        if(recipe){
          const newVote = recipe.upvote + 1;
          db.Recipes.update({ upvote : newVote }, {
            where: {
              id: recipe.id
            }
          })
          .then(updateResponse => {
            if(updateResponse){
              db.Votes.create({
                recipeId: recipeId,
                userId : userId,
                voteType : vote
              }).then( voteResponse => {
                if(voteResponse){
                  return true;
                }
              }) 
            }
            
          })
        }
      })
    })
  }

/**
 * A method that allows the user to downvote/dislike a recipe
 * 
 * @returns {object} insertion error messages object or success message object
 * @param {object} request 
 * @param {object} reponse 
 * @memberof Recipes
*/
addDownvote(request, reponse) {
    db.Recipes.fineOne({
        where: {
          recipeId: request.params.id
        }
      })
      .then(recipe => {
        db.Recipes.update({
            downvotes: recipe.upvote + 1
          }, {
            where: {
              recipeId: request.params.id
            }
          })
          .then((updateResponse) => {
            if (updateResponse) {
              reponse.status(200).json({status: 200, data: "Vote added"});
            }
          })
          .catch(error => {
            reponse.json(error);
          })
      })
      .catch(err => {
        reponse.status(500).json({status: 500, message: err.message});
      });
  }
/**
 * A method that allows the user to get his favourite recipe
 * 
 * @returns {object} insertion error messages object or success message object
 * @param {object} request 
 * @param {object} reponse
 * @memberof Recipes
*/
getFavourites(request, reponse) {
    const userId = request.params.id;
    if(!validate.validateId(userId)){
      request.status(400).json({ status : 400, message : "Id is not a valid integer"});
    }
		db.Favourites.findAll({ attributes : ['recipeId']}, { where : { userId  }})
		.then((favourites) => {
      if(favourites){
        let ids = [];
        favourites.map(favourite => {
          ids.push(favourite.recipeId);
        });
        db.Recipes.findAll({ 
          where : { id : [...ids]}
        })
        .then(favouriteRecipes => {
          if (favouriteRecipes ) {
           reponse.status(200).json({ status: 200, data : favouriteRecipes });
          }else{
            reponse.status(404).json({ status: 404, message : "No recipe found!!" });
          } 
        })
      }	
		})
		.catch(err => {
			reponse.status(500).json({ status: 500, message : err.message });
		});
	}
  /**
   * A method that allows the user to add a recipe to his favourite list recipes
   * 
   * @returns {object} insertion error messages object or success message object
   * @param {object} request 
   * @param {object} reponse 
   * @memberof Recipes
  */
  addFavourites(request, reponse) {
    const userId = request.params.id;
    const recipeId = request.body.recipeId;
    if(validate.validateId(userId) && validate.validateId(recipeId)){
      reponse.status(400).json({ status : 400, message: "User Id and Recipe ID must be a valid not integer"});
    }
    const data = {
      userId, recipeId
    }
    db.Favourites.create(data)
    .then((favourite) => {			
      if (favourite) {
          reponse.status(201).json({ status: 201, favourite });
      }  
    })
    .catch(err => {
      reponse.status(500).json({ status: 500, message : err.message });
    });
  }
  /**
   * A method that allows the user to remove a recipe from his favourite recipes
   * 
   * @returns {object} insertion error messages object or success message object
   * @param {object} request 
   * @param {object} reponse
   * @memberof Recipes
  */
  removeFavourites(request, reponse) {
    const recipeId = request.body.recipeId;
    const userId = validate.getUserId(request, reponse); 
    if(validate.validateId(recipeId)){ 
      db.Favourites.findOne({ where : { userId, recipeId }})
      .then(favourite => {
        if(favourite){
          db.Favourites.destroy({
            where: {
              id: favourite.id
            }
          })
          .then((reponseult) => {
            if (reponseult) {
              reponse.status(200).json({ status : 200, message: "Favourite recipe removed"});
            }
          })
          .catch(err => {
            reponse.status(400).json({ status : 400, message : err.message});
          });
        }else{
          reponse.status(401).json({message: `You dont have this recipe as a favourite` });
        } 
      }); 
    }else{
      reponse.status(400).json({message: `Id "${recipeId}" is not a valid integer` });
    }
  }
/**
 * A method that allows the user to search for recipes on the collection
 * 
 * @returns {object} insertion error messages object or success message object
 * @param {object} request 
 * @param {object} reponse
 * @memberof Recipes
*/
search(request, reponse) {
    db.Recipes.findAll({
      where: {
        id: request.params.id
      }
    })
    .then((items) => {
      if (items) {
        reponse.status(200).json({status: 200, data: items});
      }
    })
    .catch(err => {
      reponse.status(500).json({message: err.message});
    });
  }
}

export default new Recipes();
