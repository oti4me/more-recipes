'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recipes = require('../controllers/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _jwtMiddleware = require('../middleware/jwtMiddleware');

var _jwtMiddleware2 = _interopRequireDefault(_jwtMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// get all user from database
router.get('/', _recipes2.default.getAllRecipes);

// get single user from database
router.get('/:id', _recipes2.default.getSingleRecipe);

// Add recipe to database
router.post('/', _jwtMiddleware2.default.verifyToken, _recipes2.default.addRecipe);

// remove recipe from the database
router.delete('/:id', _recipes2.default.deleteRecipe);

// update recipe route
router.put('/:id', _jwtMiddleware2.default.verifyToken, _recipes2.default.updateRecipe);

// Add a review to a recipe
router.post('/:id/reviews', _jwtMiddleware2.default.verifyToken, _recipes2.default.reviewRecipe);
// Add a review to a recipe
router.get('/:id/reviews', _jwtMiddleware2.default.verifyToken, _recipes2.default.getReviews);

// Upvote up a recipe
router.post('/:id/upvotes', _jwtMiddleware2.default.verifyToken, _recipes2.default.addUpvote);

// Downvote up a recipe
router.post('/:id/downvotes', _jwtMiddleware2.default.verifyToken, _recipes2.default.addDownvote);

exports.default = router;