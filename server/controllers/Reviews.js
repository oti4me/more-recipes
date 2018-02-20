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
   * @description A method that allows a user to review recipes on the collection
   * 
   * @param {object} request HTTP request object
	 * @param {object} response HTTP response object
	 *
	 * @returns {object} error messages object or success message object
   * 
   * @memberof Reviews
  */
  reviewRecipe(request, response) {
    const recipeId = request.params.id
    const { comment } = request.body;
    const userId = validate.getUserId(request, response);
    validate.validateReviewRecipe(request, response);
    var errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({
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
                  message: 'Your already have a review with same content'
                });
              } else {
                db.Reviews.create({
                  recipeId, userId, comment
                })
                  .then((review) => {
                    response.status(201).json({
                      review
                    });
                  })
              }
            })

          } else {
            response.status(404).json({
              message: `No recipe with ID '${recipeId}' `
            });
          }
        })
        .catch(error => {
          response.status(500).json({
            message: error.message
          });
        })
    } else {
      response.status(400).json({
        message: 'User ID and Recipe ID must be a valid integer'
      });
    }
  }

  /**
   * @description A method that allows the user to get list of reviews for a particular recipe
   * 
   * @param {object} request 
   * @param {object} response 
   * 
   * @returns {object} insertion error messages object or success message object
   * 
   * @memberof Reviews
  */
  getReviews(request, response) {

    const id = request.params.id;
    if (!validate.validateId(id)) {
      request.status(400).json({
        message: '\'id\' is not a valid integer'
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
              { model: db.Users, attributes: ['firstName', 'lastName'] },
            ],
            order: [
              ['id', 'DESC']
            ]
          })
            .then((reviews) => {
              if (reviews.length > 0) {
                response.status(200).json({
                  reviews
                });
              }
              else {
                response.status(404).json({
                  message: 'No review found for this recipe'
                });
              }
            })
            .catch(error => {
              response.status(500).json({
                message: error.message
              });
            })
        } else {
          response.status(404).json({
            message: `No recipe with ID '${id}' `
          });
        }
      })
      .catch(error => {
        response.status(500).json({
          message: error.message
        });
      });
  }
}

export default new Reviews();
