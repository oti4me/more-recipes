"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validate = {
  validateLogin: function validateLogin(req, res) {
    req.checkBody("email", "Enter a valid email address.").isEmail();
    req.checkBody("password", "Password can't be empty.").notEmpty();
  },
  validateSignup: function validateSignup(req, res) {
    req.checkBody("firstname", "First name cannot be empty.").notEmpty();
    req.checkBody("lastname", "Last name cannot be empty.").notEmpty();
    req.checkBody("email", "Enter a valid email address.").isEmail();
    req.checkBody("phone", "Phone number can't be empty.").notEmpty();
    req.checkBody("password", "Password can't be empty.").notEmpty();
  },
  validateAddRecipes: function validateAddRecipes(req, res) {
    req.checkBody("title", "Title name cannot be empty.").notEmpty();
    req.checkBody("image", "Please, Select an image.").notEmpty();
    req.checkBody("userId", "User ID canot ber empty.").notEmpty();
    // req.checkBody("userId", "User ID must be a valid number.").isNAN();
    req.checkBody("description", "Description can't be empty.").notEmpty();
    req.checkBody("ingredients", "Ingredients can't be empty.").notEmpty();
  },
  validateId: function validateId(req, res, id) {
    if (typeof id !== "number") {
      res.json({ Message: "Id is a valid number" });
    } else return id;
  }
};

exports.default = validate;