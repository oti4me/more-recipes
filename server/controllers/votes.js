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
   * @description A method that allows the user to upvote a recipe
   * 
   * @param {undefined} request
   * 
   * @param {undefined} response
   * 
   * @returns {object} success message on success and error message on failure
   * 
   * @memberof Votes
   */
  upVotes(request, response) {
    const userId = validate.getUserId(request, response);
    const { id } = request.params;

    db.Votes
      .findCreateFind({
        where: {
          userId,
          recipeId: id,
        }
      })
      .spread((vote, created) => {
        if (created) {
          vote.update({ voted: 'upVote' });
          return db.Recipes
            .findOne({ where: { id } })
            .then((recipe) => {
              recipe.increment('upVotes').then(() => {
                response.status(201).json({
                  message: 'Your vote has been recorded',
                  recipe
                });
              });
            });
        } else if (!created && vote.voted === 'upVote') {
          vote.destroy()
          return db.Recipes
            .findOne({ where: { id } })
            .then((recipe) => {
              recipe.decrement('upVotes').then(() => {
                response.status(200).send({
                  message: 'Your vote has been removed',
                  recipe
                });
              });
            })
        } else if (!created && vote.voted === 'downVote') {
          vote.update({ voted: 'upVote' });
          return db.Recipes
            .findOne({ where: { id } })
            .then((recipe) => {
              recipe.increment('upVotes')
              recipe.decrement('downVotes').then(() => {
                recipe.reload();
              }).then(() => response.status(200).send({
                message: 'Your vote has been added',
                recipe
              }));
            });
        }
      })
      .catch(error => response.status(500).json(error.message));
  }

  /**
   * @description A method that allows the user to vote down a recipe
   * 
   * @param {object} request
   *  
   * @param {object} response 
   * 
   * @returns {object} insertion error messages object or success message object
   *
   * @memberof Votes
  */
  downVotes(request, response) {
    const userId = validate.getUserId(request, response);
    const { id } = request.params;

    db.Votes
      .findCreateFind({
        where: {
          userId,
          recipeId: id,
        }
      })
      .spread((vote, created) => {
        if (created) {
          vote.update({ voted: 'downVote' });
          return db.Recipes
            .findOne({ where: { id } })
            .then((recipe) => {
              recipe.increment('downVotes').then(() => {
                response.status(201).json({
                  message: 'Your downvote has been recorded',
                  recipe
                });
              });
            });
        } else if (!created && vote.voted === 'downVote') {
          vote.destroy()
          return db.Recipes
            .findOne({ where: { id } })
            .then((recipe) => {
              recipe.decrement('downVotes').then(() => {
                response.status(200).send({
                  message: 'Your downvote has been removed',
                  recipe
                });
              });
            })
        } else if (!created && vote.voted === 'upVote') {
          vote.update({ voted: 'downVote' });
          return db.Recipes
            .findOne({ where: { id } })
            .then((recipe) => {
              recipe.increment('downVotes')
              recipe.decrement('upVotes').then(() => {
                recipe.reload();
              }).then(() => response.status(200).send({
                message: 'Your down vote has been added',
                recipe
              }));
            });
        }
      })
      .catch(error => response.status(500).json(error.message));
  }
}

export default new Votes();
