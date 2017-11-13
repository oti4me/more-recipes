"use strict"
import path from 'path';

import validate from '../middleware/validate';
import db from '../models';

class Recipes {

  /*
	* getAllRecipes function with params @req, @res
	*
  */
  
  getAllRecipes(req, res) {
    // Get recipes based or query strings to return the most voted recipes
    let limit = 6;   // number of records per page
    let offset = 0;

    if (req.query.sort && req.query.order) {
      let order = req.query.order;
      if (req.query.sort === 'upvotes') {
        if (order === 'desc') {
          order = 'DESC';
        } else if (order === 'asc') {
          order = 'ASC';
        }
        db.Recipes.findAll({
            limit: 10,
            offset: offset,
            order: [
              ['upvotes', order]
            ]
          })
          .then((recipes) => {
            res.status(200).json({status: 200, data: recipes});
          })
          .catch(error => {
            res.status(500).json(error);
          })
      } else {
        // Get recipes based or query strings to return the least voted recipes
        if (order === 'desc') {
          order = 'DESC';
        } else if (order === 'asc') {
          order = 'ASC';
        }
        db.Recipes.findAll({
            limit : limit,
            offset: offset,
            order: [
              ['upvotes', order]
            ]
          })
          .then((recipes) => {
            res.status(200).json({status: 200, data: recipes});
          })
          .catch(error => {
            res.status(500).json(error);
          })
      }
    }

    //get all recipes
    db.Recipes.findAndCountAll()
    .then((data) => {
      let page = req.body.page ? req.body.page : 1;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      db.Recipes.findAll({
        limit: limit,
        offset: offset,
        order: [
              ['id', 'DESC']
            ]
      })
      .then((recipes) => {
        if(recipes){
          res.status(200).json({status: 200, data: recipes, pages : pages });
        }else{
          res.status(401).json({status: 400, message: "No recipe found"});
        }
      })
      .catch(error => {
        res.status(500).json(error);
      })
    })
   
  }

  /*
	* getSingleRecipes function with @params id, and a return type of array
	*
	*/
  getSingleRecipe(req, res) {
    const id = req.params.id;
    if(validate.validateId(id)){ 
      db.Recipes.findById(id)
        .then((recipe) => {
          if(recipe){
            res.status(200).json({status: 200, data: recipe});
          }else{
            res.status(400).json({status: 400, message: "Recipe with id '" + id + "' not found"});
          }          
        })
        .catch(error => {
          res.status(500).json({status: 500, message: error.message});
        })
    }else{
      res.status(400).json({message: `Id "${id}" is not a valid integer` });
    }
  }

    /*
	* getSingleRecipes function with @params id, and a return type of array
	*
	*/
  getMyRecipes(req, res) {
    const id = req.params.id;
    if(validate.validateId(id)){ 
      let limit = 6;   // number of records per page
      let offset = 0;
      db.Recipes.findAndCountAll({ 
        where : { 
            userId : id
          }
        })
      .then((data) => {
        let page = req.body.page ? req.body.page : 1;      // page number
        let pages = Math.ceil(data.count / limit);
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
              res.status(200).json({status: 200, data: recipes});
            }else{
              res.status(400).json({status: 400, message: "User with id '" + rid + "' not found"});
            }          
          })
        })
        .catch(err =>{
          res.status(500).json({status: 500, message: err.message});
        });
    }else{
      res.status(400).json({message: `Id "${req.params.id}" is not a valid integer` });
    }
  }

  /*
	* addRecipe function with params @req, @res
	*
	*/
  addRecipe(req, res) {
    validate.validateAddRecipes(req, res);
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ status : 400, message : errors });
    } else {
      db.Recipes.create(req.body)
        .then((result) => {
          if (result) {
            return res.status(201).json({status: 201, message: "Recipe added"});
          } else {
            return res.status(400).json({status: 400, message: "Error Adding recipe, try again later"});
          }
        })
        .catch(error => {
          return res.status(500).json({status: 500, message: error.message});
        })
    }
  }

  /*
	* Delete recipe function with params @req, @res
	*
	*/
  deleteRecipe(req, res) {
    const id = req.params.id;
    const userId = req.body.userId;
    if(validate.validateId(id) && validate.validateId(userId)){ 
      db.Recipes.findOne({
        where : {
          id : id,
          userId : userId
        }
      })
      .then(result => {
        if(result){
          db.Recipes.destroy({
            where: {
              id: result.id
            }
          })
          .then((result) => {
            if (result) {
              res.status(200).json({message: "Data deleted"});
            }
          })
          .catch(err => {
            res.status(400).json({message: err.message});
          });
        } else{
          res.status(400).json({message: 'User with id ' + userId + ' has no recipe with id '+ id });
        }  
      }); 
    }else{
      res.status(400).json({message: `User ID and recipe ID must be a valid integer` });
    }
  }

  updateRecipe(req, res) {
    const id = req.params.id;
    const userId = req.body.userId;   
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ status : 400, message : errors });
    } else {
      if(validate.validateId(id) && validate.validateId(userId)){ 
        db.Recipes.findOne({
          where : {
            id, userId 
          }
        })
        .then(result => {
          if(result){
            db.Recipes.update(req.body, {
              where: {
                id: result.id
              }
            })
            .then((result) => {
              if (result) {
                res.status(200).json({message: "Data Updated"});
              }
            })
            .catch(err => {
              res.status(400).json({message: err.message});
            });
          }
          else{
            res.status(400).json({message: "Recipe with id "+ id +" not found"});
          }
        })
      }else{
        res.status(400).json({ status : 400, message : 'user ID and recipe ID must be a valid integer' });
      }
      }
    
  }

  reviewRecipe(req, res) {
    const { recipeId, userId, comment } = req.body;
    validate.validateReview(req, res);
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ status : 400, message : errors });
    }
    db.Reviews.create({
      recipeId, userId, comment
    })
    .then((result) => {
      res.status(200).json({ status: 200, data: result});
    })
    .catch(error => {
      res.status(500).json({ status : 500, message : error.message });
    })
  }

  getReviews(req, res) {
    const id = req.params.id;
    if(!validate.validateId(id)){
      req.status(400).json({ status : 400, message : "Id is not a valid integer"});
    }
    db.Reviews.findAll({
      where: {
        ecipeId: id
      }
    })
    .then((result) => {
      if (result) {
        res.status(200).json({ status: 200, data: result});
      }
      else{
        res.status(400).json({ status: 400, message: 'No review found for this recipe'});
      }
    })
    .catch(error => {
      res.status(500).json({ status : 500, message : error.message });
    })
  }

  addUpvote(req, res) {
    const userId = req.body.userId;
    const id = req.params.id;
    const vote = req.body.vote;
    if(validate.validateId(userId) && validate.validateId(id)) {
      return res.status(400).json({ status : 400, message : 'user ID or Recipe ID is invalid' });
    }
    if(validate.validateId(userId) && validate.validateId(id)) {
      return res.status(400).json({ status : 400, message : 'user ID or Recipe ID is invalid' });
    }
    db.Votes.findOne({
      where: {
        recipeId: recipeId,
        userId : userId
      }
    }).then(res => {
      if(res){
        return res.status(400).json({ status : 400, message : 'Already Votted' });
      }
      db.Recipes.findOne({
        where: {
          recipeId: recipeId
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
          .then(res => {
            db.Votes.create({
              recipeId: recipeId,
              userId : userId,
              voteType : vote
            }).then( res => {
            }) 
          })
        }
      })
    })
  }

  addDownvote(req, res) {
    db.Recipes.fineOne({
        where: {
          recipeId: req.params.id
        }
      })
      .then(user => {
        db.Recipes.update({
            downvotes: recipe.upvote + 1
          }, {
            where: {
              recipeId: req.params.id
            }
          })
          .then((result) => {
            if (result) {
              res.status(200).json({status: 200, data: "Vote added"});
            }
          })
          .catch(error => {
            res.json(error);
          })
      })
      .catch(err => {
        res.status(500).json({status: 500, message: err.message});
      });
  }

  getFavourites(req, res) {
    const userId = req.params.id;
    if(!validate.validateId(id)){
      req.status(400).json({ status : 400, message : "Id is not a valid integer"});
    }
		db.Favourites.findAll({ attributes : ['recipeId']}, { where : { userId  }})
		.then((favourite) => {
      if(favourite){
        let ids = [];
        result.map(favourite => {
          ids.push(favourite.recipeId);
        });
      }	
      console.log(ids);
      db.Recipes.findAll({ 
        where : { id : [...ids]}
      })
      .then(favourites => {
        if (favourites ) {
         res.status(200).json({ status: 200, data : favourites });
        }else{
          res.status(401).json({ status: 401, message : "No recipe found!!" });
        } 
      })
		})
		.catch(err => {
			res.status(500).json({ status: 500, message : err.message });
		});
	}

	addFavourites(req, res) {
    const userId = req.params.id;
    const recipeId = req.body.recipeId;
    if(validate.validateId(userId) && validate.validateId(recipeId)){
      res.status(400).json({ status : 400, message: "User Id and Recipe ID must be a valid not integer"});
    }
    const data = {
      userId, recipeId
    }
		db.Favourites.create(data)
		.then((favourite) => {			
      if (favourite) {
         res.status(201).json({ status: 201, data : favourite });
			}  
		})
		.catch(err => {
			res.status(500).json({ status: 500, message : err.message });
		});
  }
  
  removeFavourites(req, res) {
    const recipeId = req.body.recipeId;
    const userId = req.params.id;
    if(validate.validateId(recipeId)){ 
      db.Favourites.findOne({ where : { userId, recipeId }})
      .then(result => {
        if(result){
          db.Favourites.destroy({
            where: {
              id: result.id
            }
          })
          .then((result) => {
            if (result) {
              res.status(200).json({message: "Favourite recipe removed"});
            }else{
              res.status(400).json({ status : 400, message: "Recipe with id "+ recipeId +" not found"});
            }
          })
          .catch(err => {
            res.status(400).json({ status : 400, message: "cannot find recipes"});
          });
        } else{
          res.status(400).json({ status : 400, message: "Recipe with id "+ recipeId +" not found"});
        }  
      }); 
    }else{
      res.status(400).json({message: `Id "${req.params.id}" is not a valid integer` });
    }
	}

  search(req, res) {
    db.Recipes.findAll({
        where: {
          id: req.params.id
        }
    })
    .then((items) => {
      if (items) {
        res.status(200).json({status: 200, data: items});
      }
    })
    .catch(err => {
      res.status(400).json({message: err.message});
    });
  }
}

export default new Recipes();
