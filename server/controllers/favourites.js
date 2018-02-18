"use strict"
import validate from '../middleware/validate';
import db from '../models';

/**
 * @description Creates an object of of favourites controller
 * 
 * @class Recipes
*/
class Favourites {

  /**
   * @description A method that allows the user to get his favourite recipe
   * 
   * @param {object} request request object
   * @param {object} response response object
   * 
   * @returns {object} insertion error messages object or success message object
   * 
   * @memberof Favourites
  */
  getFavourites(request, response) {
    const id = Number(request.params.id);
    let page = Number(request.params.page) || 1;
    let offset = Number(request.params.offset) || 0;
    const limit = Number(request.params.limit) || 8;
    const userId = validate.getUserId(request, response);

    if (userId !== id) {
      return response.status(400).json({
        message: 'This user is not authenticated'
      });
    }

    if (!validate.validateId(userId)) {
      return response.status(400).json({
        message: 'The user ID supplied is not a valid integer'
      });
    }

    db.Favourites.findAll({
      attributes: ['recipeId'],
      where: { userId }
    })
      .then((favourites) => {
        if (favourites.length < 1) {
          return response.status(404).json({
            message: 'No favourite found'
          });
        }
        if (favourites.length > 0) {
          let ids = [];
          favourites.map(favourite => {
            ids.push(favourite.recipeId);
          });
          db.Recipes.findAndCountAll({ where: { id: [...ids] } })
            .then((foundRcipe) => {
              const { count } = foundRcipe;
              let pages = Math.ceil(count / limit);
              offset = limit * (Number(page) - 1);
              const totalCount = count;
              const pageCount = pages;
              const pageSize = limit;
              db.Recipes.findAll({
                limit,
                offset,
                order: [
                  ['id', 'DESC']
                ],
                where: { id: [...ids] },
                include: [
                  { model: db.Users, attributes: ['firstName', 'lastName'] },
                  { model: db.Reviews }
                ]
              })
                .then((favouriteRecipes) => {
                  if (favouriteRecipes.length > 0) {
                    response.status(200).json({
                      favouriteRecipes,
                      pagination: {
                        pages,
                        totalCount,
                        pageCount,
                        pageSize
                      }
                    });
                  } else {
                    response.status(404).json({
                      message: 'No recipe found'
                    });
                  }
                })
                .catch(error => {
                  response.status(500).json({
                    message: error
                  });
                });
            });
        }
      });
  }

  /**
   * @description A method to get a single favourite recipe based on user ID and recipe ID
   * 
   * @param {object} request reqeust object
   * @param {object} response response object
   * 
   * @returns {object} insertion error messages object or success message object
   * 
   * @memberof Favourites
  */
  getSingleFavourite(request, response) {
    const { recipeId, id } = request.params;
    const userId = validate.getUserId(request, response);

    if (Number(userId) !== Number(id)) {
      return response.status(400).json({
        message: 'This user is not authenticated'
      });
    }

    if (!validate.validateId(userId)) {
      h
      return response.status(400).json({
        message: 'The user ID supplied is not a valid integer'
      });
    }

    db.Favourites.findOne({
      where: { userId, recipeId }
    })
      .then((favourites) => {
        if (favourites) {
          response.status(200).json({
            favourites
          });
        } else {
          response.status(404).json({
            message: 'No favourite recipe found!!'
          });
        }
      })
      .catch(error => {
        const { message } = error
        response.status(500).json({
          message
        });
      });
  }


  /**
   * @description A method to get a single favourite recipe based on user ID and recipe ID
   * 
   * @param {object} request request object
   * @param {object} response request object
   * 
   * @returns {object} insertion error messages object or success message object
   * 
   * @memberof Favourites
  */
  getMostFavourited(request, response) {
    db.Recipes.findAll({
      limit: 8,
      offset: 0,
      where: {
        favouriteCount: { $gt: 0 }
      },
      include: [
        { model: db.Users, attributes: ['firstName', 'lastName'] },
      ],
      order: [
        ['favouriteCount', 'DESC']
      ]
    })
      .then(recipes => {
        if (recipes.length > 0) {
          response.status(200).json({
            recipes
          });
        } else {
          response.status(404).json({
            message: 'No recipe returned'
          });
        }
      })
      .catch(error => {
        const { message } = error;
        response.status(500).json({
          message
        });
      });
  }

  /**
   * @description A method that allows the user to add a recipe to his favourite list recipes
   * 
   * @param {object} request request object
   * @param {object} response request object
   * 
   * @returns {object} insertion error messages object or success message object
   * 
   * @memberof Favourites
  */
  addFavourite(request, response) {

    const userId = validate.getUserId(request, response);
    const { recipeId } = request.params;

    if (!(validate.validateId(userId) && validate.validateId(recipeId))) {
      return response.status(400).json({
        message: 'User ID and Recipe ID must be a valid integer'
      });
    }

    db.Recipes.findById(recipeId)
      .then(recipe => {
        if (recipe) {
          db.Favourites.findOne({
            where: {
              userId, recipeId
            }
          })
            .then(foundFavourite => {
              if (foundFavourite) {
                const { id } = foundFavourite
                db.Favourites.destroy({
                  where: {
                    id
                  }
                })
                  .then((responseult) => {
                    recipe.decrement('favouriteCount')
                    if (responseult) {
                      return response.status(200).json({
                        message: 'Favourite recipe removed'
                      });
                    }
                  })
                  .catch(error => {
                    const { message } = error;
                    return response.status(500).json({
                      message
                    });
                  });
              } else {
                db.Favourites.create({
                  userId, recipeId
                })
                  .then((favourite) => {
                    recipe.increment('favouriteCount')
                    if (favourite) {
                      response.status(201).json({
                        favourite,
                        message: 'Favourite recipe added'
                      });
                    }
                  })
                  .catch(error => {
                    const { message } = error
                    response.status(500).json({
                      message
                    });
                  });
              }
            })
        }
      }).catch(error => {
        response.status(500).json({
          message: error.response
        });
      });
  }

  /**
   * @description A method that allows the user to remove a recipe from his favourite recipes
   * 
   * @param {object} request request object
   * @param {object} response response object
   * 
   * @returns {object} insertion error messages object or success message object
   * 
   * @memberof Favourites
  */
  removeFavourite(request, response) {
    const recipeId = request.params.recipeId;
    const userId = validate.getUserId(request, response);
    if (validate.validateId(recipeId)) {
      db.Recipes.findById(recipeId)
        .then(foundRecipe => {
          if (foundRecipe) {
            db.Favourites.findOne({ where: { userId, recipeId } })
              .then(favourite => {
                if (favourite) {
                  db.Favourites.destroy({
                    where: {
                      id: favourite.id
                    }
                  })
                    .then((responseult) => {
                      if (responseult) {
                        foundRecipe.increment('favouriteCount')
                        response.status(200).json({
                          message: 'Favourite recipe removed'
                        });
                      }
                    })
                    .catch(err => {
                      response.status(500).json({
                        message: err.message
                      });
                    });
                } else {
                  response.status(401).json({
                    message: `You dont have this recipe as a favourite`
                  });
                }
              });
          } else {
            return response.status(404).json({
              message: `Recipe with ID ${recipeId} does not exist`
            });
          }
        })
    } else {
      response.status(400).json({
        message: `Id "${recipeId}" is not a valid integer`
      });
    }
  }

}

export default new Favourites();
