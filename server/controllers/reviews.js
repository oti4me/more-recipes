"use strict"
import validate from '../middleware/validate';
import db from '../models';

/**
 * 
 * 
 * @class Reviews
*/
class Reviews {

  /**
   * A method that allows a user to review recipes on the collection
   * @memberof Reviews
   * @param {object} request 
   * @param {object} response 
   * 
   * @returns {object} insertion error messages object or success message object
  */
  reviewRecipe(request, response) {
    const recipeId = request.params.id
    const { comment } = request.body;
    const userId = validate.getUserId(request, response);
    validate.validateReviewRecipe(request, response);
    var errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({
        succes: false,
        message: errors
      });
    }
    if (validate.validateId(recipeId) && validate.validateId(userId)) {
      db.Recipes.findById(recipeId)
        .then(recipe => {
          if (recipe) {
            db.Reviews.findOne({
              where: {
                userId, comment, recipeId
              }
            }).then(foundReview => {
              if (foundReview) {
                response.status(409).json({
                  succes: false,
                  message: 'Your already have a review with same content'
                });
              } else {
                db.Reviews.create({
                  recipeId, userId, comment
                })
                  .then((review) => {
                    response.status(201).json({
                      succes: true,
                      review
                    });
                  })
              }
            })

          } else {
            response.status(404).json({
              succes: false,
              message: `No recipe with ID '${recipeId}' `
            });
          }
        })
        .catch(error => {
          response.status(500).json({
            succes: false,
            message: error.message
          });
        })
    } else {
      response.status(400).json({
        succes: true,
        message: 'User ID and Recipe ID must be a valid integer'
      });
    }
  }
  /**
   * A method that allows the user to get list of reviews for a particular recipe
   * 
   * @memberof Reviews
   * @param {object} request 
   * @param {object} response 
   * 
   * @returns {object} insertion error messages object or success message object
  */
  getReviews(request, response) {
    const id = request.params.id;
    if (!validate.validateId(id)) {
      request.status(400).json({
        succes: false,
        message: 'Id is not a valid integer'
      });
    }
    db.Recipes.findById(id)
      .then(recipe => {
        if (recipe) {
          db.Reviews.findAll({
            where: {
              recipeId: id,
            },
            include: [
              { model: db.Users, attributes: ['firstname', 'lastname'] },
            ],
            order: [
              ['id', 'DESC']
            ]
          })
            .then((reviews) => {
              if (reviews) {
                response.status(200).json({
                  succes: true,
                  reviews
                });
              }
              else {
                response.status(404).json({
                  succes: false,
                  message: 'No review found for this recipe'
                });
              }
            })
            .catch(error => {
              response.status(500).json({
                succes: false,
                message: error.message
              });
            })
        } else {
          response.status(404).json({
            succes: false,
            message: `No recipe with ID '${id}' `
          });
        }
      })
      .catch(error => {
        response.status(500).json({
          succes: false,
          message: error.message
        });
      });
  }
}

export default new Reviews();
