"use strict"
import validate from '../middleware/validate';
import db from '../models';

/**
 * 
 * 
 * @class Votes
 */
class Votes {

  /**
   * A method that allows the user to get a recipe's upvotes
   * 
   * @memberof Votes
   * @method
   * @param {object} request 
   * @param {object} response 
   * 
   * @returns {object} insertion error messages object or success message object 
  */
  getUpVotes(request, response) {
    const userId = validate.getUserId(request, response);  
    const recipeId = request.params.id;
    if(!(validate.validateId(userId) && validate.validateId(Number(recipeId)))) {
      return response.status(400).json({ 
        succes: false, 
        message : 'user ID or Recipe ID is invalid' 
      });
    }
    db.Recipes.findOne({
      attributes : ['upvotes']},
       { where : { id: recipeId  }
    })
    .then(votes =>{
      return response.status(200).json({ 
        succes: true, 
        upvotes : votes.upvotes
      })
    })
    .catch(error =>{
      return response.status(500).json({ 
        succes: false, 
        message : error.message
      })
    });
  }

  /**
   * A method that allows the user to get a recipe's downvotes
   * 
   * @memberof Votes
   * @method
   * @param {object} request 
   * @param {object} response 
   * 
   * @returns {object} insertion error messages object or success message object 
  */
  getDownVotes(request, response) {
    const userId = validate.getUserId(request, response);  
    const recipeId = request.params.id;
    if(!(validate.validateId(userId) && validate.validateId(Number(recipeId)))) {
      return response.status(400).json({ 
        succes: false, 
        message : 'user ID or Recipe ID is invalid' 
      });
    }
    db.Recipes.findOne({
      attributes : ['downvotes']},
       { where : { id: recipeId  }
    })
    .then(votes =>{
      return response.status(200).json({ 
        succes: true, 
        downvotes : votes.downvotes
      })
    })
    .catch(error =>{
      return response.status(500).json({ 
        succes: false, 
        message : error.message
      })
    });
  }

  /**
   * A method that allows the user to vote up or down a recipe
   * 
   * @memberof Votes
   * @param {object} request 
   * @param {object} response 
   * 
   * @returns {object} insertion error messages object or success message object
  */
  votes(request, response) {
    const recipeId = request.params.id
    const userId = validate.getUserId(request, response);
    validate.validatevaVotes(request, response);
    var errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({ 
        succes: false, 
        message : errors 
      });
    }
    
    let voted = request.body.voteType;
    if(!validate.validateId(recipeId)){
      return response.status(404).json({ 
        succes: false, 
        message: `Recipe ID '${recipeId}' is not a valid integer`
      });
    }
    db.Recipes.findById(recipeId)
    .then(recipe => {
      if(recipe){
        db.Votes.findOne({
          where: {
            userId, 
            voted, 
            recipeId: recipe.id
          }
        })
        .then(vote =>{
          if(vote){
            let query = {};
            if(voted === 'upvotes'){
              query = { upvotes : db.Sequelize.literal('upvotes - 1' ) }
            }else{
              query = { downvotes : db.Sequelize.literal('downvotes - 1' ) }
            }
            db.Recipes.update(query,{ 
              where: {
                id: recipeId
              }
            })
            .then(res =>{
              db.Votes.destroy({
                where: {
                  id: vote.id
                }
              })
              .then(res => {
                response.status(200).json({ 
                  succes: true, 
                  message: `${voted} removed`
                });
              })
            })
            .catch(error =>{
              response.status(500).json({ 
                succes: false, 
                message: error.message
              });
            });

          }else{
            let query = {};
            if(voted === 'upvotes'){
              query = { upvotes : db.Sequelize.literal('upvotes + 1' ) }
            }else{
              query = { downvotes : db.Sequelize.literal('downvotes + 1' ) }
            }
            db.Votes.create({
              voted,
              recipeId,
              userId,
            })
            .then(downvote =>{
              if(downvote){
                db.Recipes.update(query,{
                    where: { id: recipeId }
                })
                .then(res => {
                  if(res){
                    response.status(201).json({ 
                      succes: true, 
                      message: `${voted} added`
                    });
                  }
                })
              }
            })
          }
        })
        .catch(error => {
          response.status(500).json({ 
            succes: false, 
            message: error.message
          });
        })
      }else{
        response.status(400).json({ 
          succes: false, 
          message: `No recipe with ID ${recipeId}`
        });
      }
    })
  }
}

export default new Votes();
