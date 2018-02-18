"use strict"
import validate from '../middleware/validate';
import db from '../models';

/**
 * @description - Class Definition for Recipes Object
 * 
 * @class Recipes
*/
class Recipes {

  /**
   * @description Get all recipes in the collection
   * 
   * @param {object} request HTTP request object
   * @param {object} response HTTP response object
   * 
   * @returns {object} error object on failure or returns recipes object on seccessful
   * 
   * @memberof Recipes
  */
  getAllRecipes(request, response) {
    // Get recipes based or query strings to return the most voted recipes
    let limit = request.params.limit || 8;   // number of records per page
    let offset = request.params.offset || 0;
    let totalCount = 0;
    let pageCount = 0;
    let pageSize = 0;

    if (request.query.sort && request.query.order === 'desc') {
      db.Recipes.findAll({
        limit,
        offset,
        where: {
          upVotes: { $gt: 0 }
        },
        order: [
          ['upVotes', 'DESC']
        ]
      })
        .then((recipes) => {
          if (recipes.length > 0) {
            return response.status(200).json({
              recipes
            });
          } else {
            return response.status(404).json({
              message: 'No recipe found'
            });
          }
        })
        .catch(error => {
          return response.status(500).json(error);
        })
    } else {

      //get all recipes
      db.Recipes.findAndCountAll()
        .then((foundRcipe) => {
          const { count } = foundRcipe;
          let { page } = request.query;
          page = page ? page : 1;
          let pages = Math.ceil(count / limit);
          offset = limit * (Number(page) - 1);
          totalCount = count;
          pageCount = pages;
          pageSize = limit;
          db.Recipes.findAll({
            limit,
            offset,
            order: [
              ['id', 'DESC']
            ],
            include: [
              { model: db.Users, attributes: ['firstName', 'lastName'] },
              { model: db.Reviews }
            ]
          })
            .then((recipes) => {
              if (recipes.length > 0) {
                response.status(200).json({
                  recipes,
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
              response.status(500).json(error);
            })
        })
    }
  }

  /**
   * @description Get a recipe from the collection
   * 
   * @param {object} request HTTP request object
   * @param {object} response HTTP response object
   * 
   * @returns {object} error object on failure or returns recipes object on seccessful
   * 
   * @memberof Recipes
  */
  getSingleRecipe(request, response) {

    const recipeId = request.params.id;
    const userId = validate.getUserId(request, response);

    if (!validate.validateId(recipeId)) {
      return response.status(400).json({
        message: `the ID supplied is not a valid integer`
      });
    }

    db.Recipes.findOne({
      where: {
        id: recipeId
      },
      include: [
        { model: db.Users, attributes: ['firstName', 'lastName'] },
        { model: db.Reviews },
        { model: db.Favourites }
      ]
    })
      .then((recipe) => {

        if (recipe === null) {
          return response.status(404).json({
            message: `No recipe with ID ${recipeId}`
          });
        }

        if (recipe.userId === userId) {
          return response.status(200).json({
            recipe
          });
        }

        recipe.increment('viewCount');
        return response.status(200).json({
          recipe
        })
      })
      .catch(error => {
        const { message } = error;
        return response.status(500).json({
          message
        });
      })
  }

  /**
    * @description Get all recipes added by a perticular user
    * 
    * @param {object} request HTTP request object
    * @param {object} response HTTP response object
    * 
    * @returns {object} error object on failure or returns recipes object on seccessful
    * 
    * @memberof Recipes
   */
  getMyRecipes(request, response) {

    const id = Number(request.params.id);
    const userId = validate.getUserId(request, response);

    if (!(validate.validateId(id) && validate.validateId(userId))) {
      return response.status(400).json({
        message: `User ID must be a valid integer`
      });
    }

    if (userId !== id) {
      return response.status(401).json({
        message: `User ID supplied is not authenticated`
      });
    }

    let limit = request.params.limit || 8;   // number of records per page
    let offset = request.params.offset || 0;
    let page = Number(request.query.page) || 1;
    db.Recipes.findAndCountAll({
      where: {
        userId
      }
    })
      .then((recipesCount) => {
        if (!recipesCount) {
          return response.status(404).json({
            message: 'No recipe found for this user'
          });
        }
        const { count } = recipesCount;
        let pages = Math.ceil(count / limit);
        offset = limit * (page - 1);
        db.Recipes.findAll({
          where: {
            userId: id
          },
          limit,
          offset,
          order: [
            ['id', 'DESC']
          ]
        })
          .then((recipes) => {
            if (recipes.length > 0) {
              response.status(200).json({
                recipes,
                pagination: {
                  pages,
                  totalCount: recipesCount.count,
                  pageCount: Math.ceil(count / limit),
                  pageSize: limit
                }
              });
            } else {
              response.status(404).json({
                recipes,
                pagination: {
                  pages: 0,
                }
              });
            }
          })
      })
      .catch(error => {
        const { message } = error;
        response.status(500).json({
          message
        });
      });
  }

  /**
    * @description Add a recipe to the recipe collection
    * 
    * @param {object} request HTTP request object
    * @param {object} response HTTP response object
    * 
    * @returns {object} error object on failure or returns recipes object on seccessful
    * 
    * @memberof Recipes
   */
  addRecipe(request, response) {

    const userId = validate.getUserId(request, response);
    const {
      title, direction, description, imageUrl, ingredients
    } = request.body;
    if (!validate.validateId(userId)) {
      return response.status(400).json({
        message: 'User ID is invalid'
      });
    }

    validate.validateAddRecipes(request, response);
    const errors = request.validationErrors();

    if (errors) {
      return response.status(400).json({
        message: errors
      });
    }

    let newRecipe = {
      title,
      direction,
      description,
      imageUrl,
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
            message: 'You already have a recipe with same title',
          });
        } else {
          db.Recipes.create(newRecipe)
            .then((recipe) => {
              if (recipe) {
                return response.status(201).json({
                  message: 'New recipe added',
                  recipe
                });
              }
            })
            .catch(error => {
              const { message } = error;
              return response.status(500).json({
                message
              });
            })
        }
      })
  }

  /**
    * @description Delete a recipe from the collection
    * 
    * @param {object} request HTTP request object
    * @param {object} response HTTP response object
    * 
    * @returns {object} error object on failure or returns recipes object on seccessful
    * 
    * @memberof Recipes
   */
  deleteRecipe(request, response) {
    const userId = validate.getUserId(request, response);
    const { id } = request.params;

    if (!validate.validateId(id)) {
      return response.status(400).json({
        message: `Recipe ID must be a valid integer`
      });
    }

    db.Recipes.findOne({ where: { id } })
      .then(recipe => {
        if (recipe) {
          if (recipe.userId === userId) {
            recipe.destroy()
              .then(() => {
                return response.status(200).json({
                  message: 'Recipe deleted',
                });
              });
          } else {
            return response.status(401).json({
              message: 'You are not authorized to delete this recipe'
            });
          }
        } else {
          return response.status(404).json({
            message: 'Not found'
          });
        }
      })
      .catch(error => {
        return response.status(500).json({
          error
        });
      });
  }

  /**
   * @description Update a recipe in the collection
   * 
   * @param {object} request HTTP request object
   * @param {object} response HTTP response object
   * 
   * @returns {object} error object on failure or returns recipes object on seccessful
   * 
   * @memberof Recipes
  */
  updateRecipe(request, response) {
    const { id } = request.params;
    const userId = validate.getUserId(request, response);

    if (!(validate.validateId(id) && validate.validateId(userId))) {
      response.status(500).json({
        message: 'user ID and recipe ID must be a valid integer'
      });
    }

    validate.validateAddRecipes(request, response);
    const errors = request.validationErrors();

    if (errors) {
      return response.status(400).json({
        message: errors
      });
    }

    db.Recipes.findOne({ where: { id } })
      .then(recipe => {
        if (recipe) {
          if (recipe.userId === userId) {
            recipe.update(request.body)
              .then(() => {
                response.status(200).json({
                  message: 'Recipe Updated',
                  recipe
                });
              });
          } else {
            return response.status(401).json({
              message: 'Your are not authorized to perform this operation'
            });
          }
        }
        else {
          response.status(404).json({
            message: 'Not found'
          });
        }
      })
  }

}

export default new Recipes();
