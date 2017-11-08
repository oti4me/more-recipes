"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
						if (req.query.sort && req.query.order) {
								var order = req.query.order;
								if (req.query.sort === "upvotes") {
										if (order === "desc") {
												order = 'DESC';
										} else if (order === "asc") {
												order = 'ASC';
										}
										_models2.default.Recipes.findAll({
												limit: 10,
												order: [['upvotes', order]]
										}).then(function (recipes) {
												res.status(200).json({ status: 200, data: recipes });
										}).catch(function (error) {
												res.status(500).json(error);
										});
								} else {
										// Get recipes based or query strings to return the least voted recipes
										if (order === "desc") {
												order = 'DESC';
										} else if (order === "asc") {
												order = 'ASC';
										}

										_models2.default.Recipes.findAll({
												limit: 10,
												order: [['upvotes', order]]
										}).then(function (recipes) {
												res.status(200).json({ status: 200, data: recipes });
										}).catch(function (error) {
												res.status(500).json(error);
										});
								}

								// }
						}

						//get all recipes
						_models2.default.Recipes.findAll().then(function (recipes) {
								res.status(200).json({ status: 200, data: recipes });
						}).catch(function (error) {
								res.status(500).json(error);
						});
				}

				/*
    * getSingleRecipes function with @params id, and a return type of array
    *
    */

		}, {
				key: 'getSingleRecipe',
				value: function getSingleRecipe(req, res) {
						_models2.default.Recipes.findById(req.params.id).then(function (recipe) {
								res.status(200).json({ status: 200, data: recipe });
						}).catch(function (error) {
								res.status(500).json({ status: 500, message: error.message });
						});
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
								res.send(errors);
						} else {
								_models2.default.Recipes.create(req.body).then(function (result) {
										if (result) {
												res.status(201).json({ status: 201, message: "Recipe added" });
										} else {
												res.status(400).json({ status: 400, message: "no result returned" });
										}
								}).catch(function (error) {
										res.status(500).json({ status: 500, message: error.message });
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

						_models2.default.Recipes.destroy({
								where: {
										id: req.params.id
								}
						}).then(function (result) {
								if (result) {
										res.status(200).json({ message: "Data deleted" });
								}
						}).catch(function (err) {
								res.status(400).json({ message: err.message });
						});
				}
		}, {
				key: 'updateRecipe',
				value: function updateRecipe(req, res) {

						_models2.default.Recipes.update(req.body, {
								where: {
										id: req.params.id
								}
						}).then(function (result) {
								if (result) {
										res.status(200).json({ message: "Data Updated" });
								}
						}).catch(function (err) {
								res.status(400).json({ message: err.message });
						});
				}
		}, {
				key: 'reviewRecipe',
				value: function reviewRecipe(req, res) {

						_models2.default.Reviews.create(req.body).then(function (result) {
								res.status(200).json({ status: 200, data: result });
						}).catch(function (error) {
								res.json(error);
						});
				}
		}, {
				key: 'getReviews',
				value: function getReviews(req, res) {

						_models2.default.Reviews.findAll({
								where: {
										recipeId: req.params.id
								}
						}).then(function (result) {
								if (result) {
										res.status(200).json({ status: 200, data: result });
								}
						}).catch(function (error) {
								res.json(error);
						});
				}
		}, {
				key: 'addUpvote',
				value: function addUpvote(req, res) {

						_models2.default.Recipes.fineOne({ where: {
										recipeId: req.params.id
								} }).then(function (user) {
								var newVote = user.upvotes + 1;
								_models2.default.Recipes.update({ upvotes: newVote }, {
										where: {
												recipeId: req.params.id
										}
								}).then(function (result) {
										if (result) {
												res.status(200).json({ status: 200, data: "Vote added" });
										}
								}).catch(function (error) {
										res.status(500).json({ status: 500, message: err.message });
								});
						}).catch(function (err) {
								res.status(500).json({ status: 500, message: err.message });
						});
				}
		}, {
				key: 'addDownvote',
				value: function addDownvote(req, res) {

						_models2.default.Recipes.fineOne({ where: {
										recipeId: req.params.id
								} }).then(function (user) {
								_models2.default.Recipes.update({ downvotes: recipe.upvote + 1 }, {
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