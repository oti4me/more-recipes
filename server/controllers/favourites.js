"use strict"
import validate from '../middleware/validate';
import db from '../models';

/**
 * 
 * 
 * @class Recipes
*/
class Favourites {
  
  /**
   * A method that allows the user to get his favourite recipe
   * 
   * @returns {object} insertion error messages object or success message object
   * @param {object} request 
   * @param {object} response
   * @memberof Favourites
  */
  getFavourites(request, response) {
    const userId = validate.getUserId(request, response);
    if(!validate.validateId(userId)){
      response.status(400).json({ 
        succes: false, 
        message : 'The user ID supplied is not a valid integer'
      });
    }
    db.Favourites.findAll({
       attributes : ['recipeId']},
        { where : { userId  }
    })
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
          response.status(200).json({ succes: true, 
            favouriteRecipes 
          });
          }else{
            response.status(404).json({ 
              succes: false, 
              message : 'No recipe found!!' 
            });
          } 
        })
      }else{
        response.status(404).json({ 
          succes: false, 
          message : 'This User has no favourite recipes' 
        });
      }	
    })
    .catch(err => {
      response.status(500).json({ 
        succes: false, 
        message : err.message 
      });
    });
  }

  /**
   * A method that allows the user to add a recipe to his favourite list recipes
   * 
   * @returns {object} insertion error messages object or success message object
   * @param {object} request 
   * @param {object} response 
   * @memberof Favourites
  */
  addFavourites(request, response) {
    const userId = validate.getUserId(request, response);
    const recipeId = request.body.recipeId;
    if(!(validate.validateId(userId) && validate.validateId(recipeId))){
      return response.status(400).json({ 
        succes: false, 
        message: 'User ID and Recipe ID must be a valid integer'
      });
    }
    const data = {
      userId, recipeId
    }
    db.Recipes.findById(recipeId)
    .then(recipe => {
      if(recipe){
        db.Favourites.findOne({
          where : {
            userId, recipeId
          }
        })
        .then(foundFavourite => {
          if(foundFavourite){
            return response.status(409).json({ 
              succes: false, 
              message: `You already favourited this recipe`
            });
          }else{
            db.Favourites.create(data)
            .then((favourite) => {			
              if (favourite) {
                response.status(201).json({ 
                  succes: true, 
                  favourite 
                });
              }  
            })
            .catch(err => {
              response.status(500).json({ 
                succes: false, 
                message : err.message 
              });
            });
          }
        })
      }else{
        return response.status(400).json({ 
          succes: false, 
          message: `Recipe with ID ${recipeId} does not exist`
        });
      }
    })
  }
  /**
   * A method that allows the user to remove a recipe from his favourite recipes
   * 
   * @returns {object} insertion error messages object or success message object
   * @param {object} request 
   * @param {object} response
   * @memberof Favourites
  */
  removeFavourites(request, response) {
    const recipeId = request.body.recipeId;
    const userId = validate.getUserId(request, response); 
    if(validate.validateId(recipeId)){
      db.Recipes.findById(recipeId)
      .then(foundRecipe => {
        if(foundRecipe){
          db.Favourites.findOne({ where : { userId, recipeId }})
          .then(favourite => {
            if(favourite){
              db.Favourites.destroy({
                where: {
                  id: favourite.id
                }
              })
              .then((responseult) => {
                if (responseult) {
                  response.status(200).json({ 
                    succes: true, 
                    message: 'Favourite recipe removed'
                  });
                }
              })
              .catch(err => {
                response.status(500).json({ 
                  succes: false, 
                  message : err.message
                });
              });
            }else{
              response.status(401).json({
                message: `You dont have this recipe as a favourite` 
              });
            } 
          }); 
        }else{
          return response.status(404).json({ 
            succes: false, 
            message: `Recipe with ID ${recipeId} does not exist`
          });
        }
      })
    }else{
      response.status(400).json({
        message: `Id "${recipeId}" is not a valid integer` 
      });
    }
  }

}

export default new Favourites();
