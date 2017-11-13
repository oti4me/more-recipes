"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipes = function () {
  function Recipes() {
    _classCallCheck(this, Recipes);
  }

  _createClass(Recipes, [{
    key: 'getAllRecipes',


    /*
    * getAllRecipes function with params @req, @res
    *
    */

    value: function getAllRecipes(req, res) {
      // Get recipes based or query strings to return the most voted recipes
      var limit = 6; // number of records per page
      var offset = 0;

      if (req.query.sort && req.query.order) {
        var order = req.query.order;
        if (req.query.sort === 'upvotes') {
          if (order === 'desc') {
            order = 'DESC';
          } else if (order === 'asc') {
            order = 'ASC';
          }
          _models2.default.Recipes.findAll({
            limit: 10,
            offset: offset,
            order: [['upvotes', order]]
          }).then(function (recipes) {
            res.status(200).json({ status: 200, data: recipes });
          }).catch(function (error) {
            res.status(500).json(error);
          });
        } else {
          // Get recipes based or query strings to return the least voted recipes
          if (order === 'desc') {
            order = 'DESC';
          } else if (order === 'asc') {
            order = 'ASC';
          }
          _models2.default.Recipes.findAll({
            limit: limit,
            offset: offset,
            order: [['upvotes', order]]
          }).then(function (recipes) {
            res.status(200).json({ status: 200, data: recipes });
          }).catch(function (error) {
            res.status(500).json(error);
          });
        }
      }

      //get all recipes
      _models2.default.Recipes.findAndCountAll().then(function (data) {
        var page = req.body.page ? req.body.page : 1; // page number
        var pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);

        _models2.default.Recipes.findAll({
          limit: limit,
          offset: offset,
          order: [['id', 'DESC']]
        }).then(function (recipes) {
          if (recipes) {
            res.status(200).json({ status: 200, data: recipes, pages: pages });
          } else {
            res.status(401).json({ status: 400, message: "No recipe found" });
          }
        }).catch(function (error) {
          res.status(500).json(error);
        });
      });
    }

    /*
    * getSingleRecipes function with @params id, and a return type of array
    *
    */

  }, {
    key: 'getSingleRecipe',
    value: function getSingleRecipe(req, res) {
      var id = req.params.id;
      if (_validate2.default.validateId(id)) {
        _models2.default.Recipes.findById(id).then(function (recipe) {
          if (recipe) {
            res.status(200).json({ status: 200, data: recipe });
          } else {
            res.status(400).json({ status: 400, message: "Recipe with id '" + id + "' not found" });
          }
        }).catch(function (error) {
          res.status(500).json({ status: 500, message: error.message });
        });
      } else {
        res.status(400).json({ message: 'Id "' + id + '" is not a valid integer' });
      }
    }

    /*
    * getSingleRecipes function with @params id, and a return type of array
    *
    */

  }, {
    key: 'getMyRecipes',
    value: function getMyRecipes(req, res) {
      var id = req.params.id;
      if (_validate2.default.validateId(id)) {
        var limit = 6; // number of records per page
        var offset = 0;
        _models2.default.Recipes.findAndCountAll({
          where: {
            userId: id
          }
        }).then(function (data) {
          var page = req.body.page ? req.body.page : 1; // page number
          var pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);

          _models2.default.Recipes.findAll({
            where: {
              userId: id
            },
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
          }).then(function (recipes) {
            if (recipes) {
              res.status(200).json({ status: 200, data: recipes });
            } else {
              res.status(400).json({ status: 400, message: "User with id '" + rid + "' not found" });
            }
          });
        }).catch(function (err) {
          res.status(500).json({ status: 500, message: err.message });
        });
      } else {
        res.status(400).json({ message: 'Id "' + req.params.id + '" is not a valid integer' });
      }
    }

    /*
    * addRecipe function with params @req, @res
    *
    */

  }, {
    key: 'addRecipe',
    value: function addRecipe(req, res) {
      _validate2.default.validateAddRecipes(req, res);
      var errors = req.validationErrors();
      if (errors) {
        return res.status(400).json({ status: 400, message: errors });
      } else {
        _models2.default.Recipes.create(req.body).then(function (result) {
          if (result) {
            return res.status(201).json({ status: 201, message: "Recipe added" });
          } else {
            return res.status(400).json({ status: 400, message: "Error Adding recipe, try again later" });
          }
        }).catch(function (error) {
          return res.status(500).json({ status: 500, message: error.message });
        });
      }
    }

    /*
    * Delete recipe function with params @req, @res
    *
    */

  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(req, res) {
      var id = req.params.id;
      var userId = req.body.userId;
      if (_validate2.default.validateId(id) && _validate2.default.validateId(userId)) {
        _models2.default.Recipes.findOne({
          where: {
            id: id,
            userId: userId
          }
        }).then(function (result) {
          if (result) {
            _models2.default.Recipes.destroy({
              where: {
                id: result.id
              }
            }).then(function (result) {
              if (result) {
                res.status(200).json({ message: "Data deleted" });
              }
            }).catch(function (err) {
              res.status(400).json({ message: err.message });
            });
          } else {
            res.status(400).json({ message: 'User with id ' + userId + ' has no recipe with id ' + id });
          }
        });
      } else {
        res.status(400).json({ message: 'User ID and recipe ID must be a valid integer' });
      }
    }
  }, {
    key: 'updateRecipe',
    value: function updateRecipe(req, res) {
      var id = req.params.id;
      var userId = req.body.userId;
      var errors = req.validationErrors();
      if (errors) {
        return res.status(400).json({ status: 400, message: errors });
      } else {
        if (_validate2.default.validateId(id) && _validate2.default.validateId(userId)) {
          _models2.default.Recipes.findOne({
            where: {
              id: id, userId: userId
            }
          }).then(function (result) {
            if (result) {
              _models2.default.Recipes.update(req.body, {
                where: {
                  id: result.id
                }
              }).then(function (result) {
                if (result) {
                  res.status(200).json({ message: "Data Updated" });
                }
              }).catch(function (err) {
                res.status(400).json({ message: err.message });
              });
            } else {
              res.status(400).json({ message: "Recipe with id " + id + " not found" });
            }
          });
        } else {
          res.status(400).json({ status: 400, message: 'user ID and recipe ID must be a valid integer' });
        }
      }
    }
  }, {
    key: 'reviewRecipe',
    value: function reviewRecipe(req, res) {
      var _req$body = req.body,
          recipeId = _req$body.recipeId,
          userId = _req$body.userId,
          comment = _req$body.comment;

      _validate2.default.validateReview(req, res);
      var errors = req.validationErrors();
      if (errors) {
        return res.status(400).json({ status: 400, message: errors });
      }
      _models2.default.Reviews.create({
        recipeId: recipeId, userId: userId, comment: comment
      }).then(function (result) {
        res.status(200).json({ status: 200, data: result });
      }).catch(function (error) {
        res.status(500).json({ status: 500, message: error.message });
      });
    }
  }, {
    key: 'getReviews',
    value: function getReviews(req, res) {
      var id = req.params.id;
      if (!_validate2.default.validateId(id)) {
        req.status(400).json({ status: 400, message: "Id is not a valid integer" });
      }
      _models2.default.Reviews.findAll({
        where: {
          ecipeId: id
        }
      }).then(function (result) {
        if (result) {
          res.status(200).json({ status: 200, data: result });
        } else {
          res.status(400).json({ status: 400, message: 'No review found for this recipe' });
        }
      }).catch(function (error) {
        res.status(500).json({ status: 500, message: error.message });
      });
    }
  }, {
    key: 'addUpvote',
    value: function addUpvote(req, res) {
      var userId = req.body.userId;
      var id = req.params.id;
      var vote = req.body.vote;
      if (_validate2.default.validateId(userId) && _validate2.default.validateId(id)) {
        return res.status(400).json({ status: 400, message: 'user ID or Recipe ID is invalid' });
      }
      if (_validate2.default.validateId(userId) && _validate2.default.validateId(id)) {
        return res.status(400).json({ status: 400, message: 'user ID or Recipe ID is invalid' });
      }
      _models2.default.Votes.findOne({
        where: {
          recipeId: recipeId,
          userId: userId
        }
      }).then(function (res) {
        if (res) {
          return res.status(400).json({ status: 400, message: 'Already Votted' });
        }
        _models2.default.Recipes.findOne({
          where: {
            recipeId: recipeId
          }
        }).then(function (recipe) {
          if (recipe) {
            var newVote = recipe.upvote + 1;
            _models2.default.Recipes.update({ upvote: newVote }, {
              where: {
                id: recipe.id
              }
            }).then(function (res) {
              _models2.default.Votes.create({
                recipeId: recipeId,
                userId: userId,
                voteType: vote
              }).then(function (res) {});
            });
          }
        });
      });
    }
  }, {
    key: 'addDownvote',
    value: function addDownvote(req, res) {
      _models2.default.Recipes.fineOne({
        where: {
          recipeId: req.params.id
        }
      }).then(function (user) {
        _models2.default.Recipes.update({
          downvotes: recipe.upvote + 1
        }, {
          where: {
            recipeId: req.params.id
          }
        }).then(function (result) {
          if (result) {
            res.status(200).json({ status: 200, data: "Vote added" });
          }
        }).catch(function (error) {
          res.json(error);
        });
      }).catch(function (err) {
        res.status(500).json({ status: 500, message: err.message });
      });
    }
  }, {
    key: 'getFavourites',
    value: function getFavourites(req, res) {
      var userId = req.params.id;
      if (!_validate2.default.validateId(id)) {
        req.status(400).json({ status: 400, message: "Id is not a valid integer" });
      }
      _models2.default.Favourites.findAll({ attributes: ['recipeId'] }, { where: { userId: userId } }).then(function (favourite) {
        if (favourite) {
          var _ids = [];
          result.map(function (favourite) {
            _ids.push(favourite.recipeId);
          });
        }
        console.log(ids);
        _models2.default.Recipes.findAll({
          where: { id: [].concat(_toConsumableArray(ids)) }
        }).then(function (favourites) {
          if (favourites) {
            res.status(200).json({ status: 200, data: favourites });
          } else {
            res.status(401).json({ status: 401, message: "No recipe found!!" });
          }
        });
      }).catch(function (err) {
        res.status(500).json({ status: 500, message: err.message });
      });
    }
  }, {
    key: 'addFavourites',
    value: function addFavourites(req, res) {
      var userId = req.params.id;
      var recipeId = req.body.recipeId;
      if (_validate2.default.validateId(userId) && _validate2.default.validateId(recipeId)) {
        res.status(400).json({ status: 400, message: "User Id and Recipe ID must be a valid not integer" });
      }
      var data = {
        userId: userId, recipeId: recipeId
      };
      _models2.default.Favourites.create(data).then(function (favourite) {
        if (favourite) {
          res.status(201).json({ status: 201, data: favourite });
        }
      }).catch(function (err) {
        res.status(500).json({ status: 500, message: err.message });
      });
    }
  }, {
    key: 'removeFavourites',
    value: function removeFavourites(req, res) {
      var recipeId = req.body.recipeId;
      var userId = req.params.id;
      if (_validate2.default.validateId(recipeId)) {
        _models2.default.Favourites.findOne({ where: { userId: userId, recipeId: recipeId } }).then(function (result) {
          if (result) {
            _models2.default.Favourites.destroy({
              where: {
                id: result.id
              }
            }).then(function (result) {
              if (result) {
                res.status(200).json({ message: "Favourite recipe removed" });
              } else {
                res.status(400).json({ status: 400, message: "Recipe with id " + recipeId + " not found" });
              }
            }).catch(function (err) {
              res.status(400).json({ status: 400, message: "cannot find recipes" });
            });
          } else {
            res.status(400).json({ status: 400, message: "Recipe with id " + recipeId + " not found" });
          }
        });
      } else {
        res.status(400).json({ message: 'Id "' + req.params.id + '" is not a valid integer' });
      }
    }
  }, {
    key: 'search',
    value: function search(req, res) {
      _models2.default.Recipes.findAll({
        where: {
          id: req.params.id
        }
      }).then(function (items) {
        if (items) {
          res.status(200).json({ status: 200, data: items });
        }
      }).catch(function (err) {
        res.status(400).json({ message: err.message });
      });
    }
  }]);

  return Recipes;
}();

exports.default = new Recipes();