const validate = {
  validateLogin(req, res) {
    req
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
      req
      .checkBody("email", "Email can't be empty.")
      .notEmpty();
    req
      .checkBody("password", "Password can't be empty.")
      .notEmpty();
    req
      .checkBody("password", "Password must be between 4 and 15.")
      .isLength({ min : 4, max : 15});
  },

  validateSignup(req, res) {
    req
      .checkBody("firstname", "First name cannot be empty.")
      .notEmpty();
    req
      .checkBody("firstname", "First name must be between 4 and 15.")
      .isLength({ min : 4, max : 15});
    req
      .checkBody("lastname", "Last name cannot be empty.")
      .notEmpty();
    req
      .checkBody("lastname", "Last name must be between 4 and 15.")
      .isLength({ min : 4, max : 15});
    req
    req
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
    req
      .checkBody("email", "Email cannot be empty.")
      .notEmpty();
    req
      .checkBody("phone", "Phone number can't be empty.")
      .notEmpty();
    req
      .checkBody("phone", "Phone number is not a valid number.")
      .isNumeric();
    req
      .checkBody("password", "Password can't be empty.")
      .notEmpty();
    req
      .checkBody("password", "Phone number can't be empty.")
      .isLength({min : 4, max : 15});
  },

  validateAddRecipes(req, res) {
    req
      .checkBody("title", "Title cannot be empty.")
      .notEmpty();
      req
      .checkBody("title", "Title must be less than 4 characters.")
      .isLength({ min : 4});
    req
      .checkBody("image", "Please, Select an image.")
      .notEmpty();
    req
      .checkBody("userId", "User ID canot ber empty.")
      .notEmpty();
    req
      .checkBody("userId", "User ID is not a valid id.")
      .isNumeric();
    req
      .checkBody("description", "Description can't be empty.")
      .notEmpty();
    req
      .checkBody("description", "Description can't be be less than 8 characters.")
      .isLength({ min : 8 });
    req
      .checkBody("ingredients", "Ingredients can't be empty.")
      .notEmpty();
    req
      .checkBody("ingredients", "ingredients can't be less than 8 characters.")
      .isLength({ min : 8 });
  },

  validateUpdateRecipes(req, res) {
    
  },

  validateReview(req, res){
    req
      .checkBody("comment", "voteType can't be empty.")
      .notEmpty();
    req
      .checkBody("comment", "voteType can't be empty.")
      .isLength({ min : 4});
    req
      .checkBody("userId", "userId can't be empty.")
      .notEmpty();
      req
      .checkBody("userId", "userId not a valid ID.")
      .isNumeric();
    req
      .checkBody("recipeId", "recipeId can't be empty.")
      .notEmpty();
    req
      .checkBody("recipeId", "recipeId not a valid ID.")
      .isNumeric();
  },

  validateId(id, req, res) {
    if (isNaN(id) && !id) {
      return false
    } else { 
      return true; 
    }
}

};

export default validate;