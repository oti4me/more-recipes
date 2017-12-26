"use strict"
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
   * @param {object} request 
   * @param {object} response 
   * 
   * @returns {object} insertion error messages object or success message object
   * @memberof Recipes
  */
  getAllRecipes(request, response) {
    // Get recipes based or query strings to return the most voted recipes
    let limit = 6;   // number of records per page
    let offset = 0;

    //`page`: current page of the query result based on limit and offset
    //`pageCount`: total number of pages
    //`pageSize`: number of records per page (based on limit)
    //`totalCount`: total number of records based on query

    if (request.query.sort && request.query.order) {
      let order = request.query.order;
      if (request.query.sort === 'upvotes') {
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
            response.status(200).json({
              succes: true,
              recipes: recipes
            });
          })
          .catch(error => {
            response.status(500).json(error);
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
            return response.status(200).json({
              succes: true,
              recipes: recipes
            });
          })
          .catch(error => {
            return response.status(500).json(error);
          })
      }
    } else {
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
            ],
            include: [
              { model: db.Users, attributes: ['firstname', 'lastname'] },
              { model: db.Reviews }
            ]
          })
            .then((recipes) => {
              if (recipes) {
                response.status(200).json({
                  succes: true,
                  recipes,
                  pages
                });
              } else {
                response.status(404).json({
                  succes: false,
                  message: 'No recipe found'
                });
              }
            })
            .catch(error => {
              response.status(500).json(error);
            })
        })
    }
  }

  /**
    * A method get a single recipe base on recipe ID
    *
    * @param {object} request 
    * @param {object} response 

    * @returns {object} insertion error messages object or success message object
    * @memberof Recipes
  */
  getSingleRecipe(request, response) {
    const id = request.params.id;
    if (validate.validateId(id)) {
      db.Recipes.findOne({
        where: {
          id
        },
        include: [
          { model: db.Users, attributes: ['firstname', 'lastname'] },
          { model: db.Reviews },
          { model: db.Favourites }
        ]
      })
        .then((recipe) => {
          if (recipe) {
            response.status(200).json({
              succes: true,
              recipe
            });
          } else {
            response.status(404).json({
              succes: false,
              message: `Recipe with id '${id}'  not found`
            });
          }
        })
        .catch(error => {
          response.status(500).json({ ssucces: false, message: error.message });
        })
    } else {
      response.status(400).json({
        message: `Id "${id}" is not a valid integer`
      });
    }
  }

  /**
   * A method to get recipes added by a user based on user ID
   * 
   * @returns {object} insertion error messages object or success message object
   * @param {object} request 
   * @param {object} response 
 */
  getMyRecipes(request, response) {
    const id = request.params.id;
    const userId = validate.getUserId(request, response);
    if (validate.validateId(id) && validate.validateId(userId)) {
      let limit = 8;   // number of records per page
      let offset = 0;
      db.Recipes.findAndCountAll({
        where: {
          userId: id
        }
      })
        .then((recipesCount) => {
          if (!recipesCount) {
            return response.status(400).json({
              succes: false,
              message: 'No recipe return for this user'
            });
          }
          let page = request.body.page ? request.body.page : 1; // page number
          let pages = Math.ceil(recipesCount.count / limit);
          offset = limit * (page - 1);

          db.Recipes.findAll({
            where: {
              userId: id
            },
            limit: limit,
            offset: offset,
            order: [
              ['id', 'DESC']
            ]
          })
            .then((recipes) => {
              if (recipes) {
                response.status(200).json({
                  succes: true,
                  recipes,
                  pages
                });
              }
            })
        })
        .catch(err => {
          response.status(500).json({
            succes: false,
            message: err.message
          });
        });
    } else {
      response.status(400).json({
        message: `Recipe Id and User ID must be a valid integer`
      });
    }
  }

  /**
   * A method add recipe to the collection
   * 
   * @param {object} request 
   * @param {object} response 
   * @returns {object} insertion error messages object or success message object
   * @memberof Recipes
   */
  addRecipe(request, response) {
    const userId = validate.getUserId(request, response);
    const { title, direction, description, image, ingredients } = request.body;
    if (!validate.validateId(userId)) {
      return response.status(400).json({
        succes: false,
        message: 'User Id is invalid'
      });
    }
    validate.validateAddRecipes(request, response);
    const errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({
        succes: false,
        message: errors
      });
    } else {
      let data = {
        title,
        direction,
        description,
        image,
        ingredients,
        userId
      }

      db.Recipes.findOne({
        where: {
          title, userId
        }
      })
        .then(foundRecipe => {
          if (foundRecipe) {
            return response.status(409).json({
              succes: false,
              message: 'You already have a recipe with same title',
            });
          } else {
            db.Recipes.create(data)
              .then((recipe) => {
                if (recipe) {
                  return response.status(201).json({
                    succes: true,
                    message: 'New recipe added',
                    recipe
                  });
                }
              })
              .catch(error => {
                return response.status(500).json({
                  succes: false,
                  message: error.message
                });
              })
          }
        })
    }
  }

  /**
   * A method that allows a user to delete recipes he or she added to the recipe collection
   * 
   * @param {object} request 
   * @param {object} response 
   * @returns {object} insertion error messages object or success message object
   * @memberof Recipes
  */
  deleteRecipe(request, response) {
    const userId = validate.getUserId(request, response);
    const id = request.params.id;
    if (validate.validateId(id) && validate.validateId(userId)) {
      db.Recipes.findById(id)
        .then(foundRecipe => {
          if (foundRecipe) {
            db.Recipes.findOne({
              where: {
                id, userId
              }
            })
              .then(recipe => {
                if (recipe) {
                  db.Recipes.destroy({
                    where: {
                      id: recipe.id
                    }
                  })
                    .then((responseponse) => {
                      if (responseponse) {
                        response.status(200).json({
                          succes: true,
                          message: 'Recipe deleted',
                        });
                      }
                    })
                    .catch(err => {
                      response.status(500).json({ message: err.message });
                    });
                }
                else {
                  response.status(400).json({
                    succes: false,
                    message: 'You is not authorised to delete this recipe'
                  });
                }
              });
          } else {
            response.status(400).json({
              succes: false,
              message: 'No recipe with such ID'
            });
          }
        });
    } else {
      response.status(400).json({
        message: `User ID and recipe ID must be a valid integer`
      });
    }
  }
  /**
   * A method that allows a user to update recipes he added to the collection
   * 
   * @param {object} request 
   * @param {object} response
   *  @returns {object} insertion error messages object or success message object
   * 
   * @memberof Recipes
  */
  updateRecipe(request, response) {
    const id = request.params.id;
    const userId = validate.getUserId(request, response);
    if (validate.validateId(id) && validate.validateId(userId)) {
      db.Recipes.findOne({
        where: {
          id, userId
        }
      })
        .then(recipe => {
          if (recipe) {
            db.Recipes.update(request.body, {
              where: {
                id: recipe.id,
              },
              returning: true
            })
              .then((updatedRecipe) => {
                if (updatedRecipe) {
                  response.status(200).json({
                    succes: true,
                    message: 'Recipe Updated',
                    recipe: updatedRecipe[1]
                  });
                }
              })
              .catch(err => {
                response.status(500).json({
                  succes: false,
                  message: err.message
                });
              });
          }
          else {
            response.status(401).json({
              succes: false,
              message: 'You are not authorised to update this recipe'
            });
          }
        })
    }
    else {
      response.status(400).json({
        succes: false,
        message: 'user ID and recipe ID must be a valid integer'
      });
    }
  }

  /**
   * A method that allows the user to search for recipes on the collection
   * 
   * @memberof Recipes
     * @method
     * @param {object} request 
     * @param {object} response 
     * 
     * @returns {object} insertion error messages object or success message object
    */
  search(request, response) {
    const query = request.body.query;
    db.Recipes.findAll({
      where: {
        title: { $ilike: `%${query}%` }
      }
    })
      .then((recipes) => {
        if (recipes) {
          response.status(200).json({
            succes: true,
            recipes
          });
        }
      })
      .catch(err => {
        response.status(500).json({
          succes: false,
          message: err.message
        });
      });
  }
}

export default new Recipes();
