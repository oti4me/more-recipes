"use strict"
// import validate from '../middleware/validate';
import db from '../models';

/**
 * 
 * 
 * @class Search
*/
class Search {

  /**
   * @description A method that allows the user to search for recipes on the collection
   *  
   * @param {object} request 
   * 
   * @param {object} response 
   * 
   * @returns {object} insertion error messages object or success message object
   * 
   * @memberof Search
  */
  search(request, response) {
    let { key, page, limit } = request.query;
    limit = limit || 8;   // number of records per page

    if (key.length < 3) {
      return response.status(404).json({
        recipes: []
      });
    }

    db.Recipes.findAll({
      where: {
        $or: [
          { title: { $ilike: `%${key}%` } },
          { ingredients: { $ilike: `%${key}%` } }
        ]
      },
      include: [
        { model: db.Users, attributes: ['firstName', 'lastName'] },
      ]
    })
      .then((recipes) => {
        if (recipes.length > 0) {
          return response.status(200).json({
            recipes
          });
        } else {
          return response.status(404).json({
            message: 'No recipe found!!'
          });
        }
      })
      .catch(err => {
        response.status(500).json({
          message: err.message
        });
      });
  }
}

export default new Search();
