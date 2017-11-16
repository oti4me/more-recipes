const validate = {
  validateLogin(req, res) {
    req
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
    req
      .checkBody("password", "Password can't be empty.")
      .notEmpty();
    req
      .checkBody("password", "Password must be at least 8 characters long.")
      .isLength({ min : 8});
  },

  validateSignup(req, res) {
    req
      .checkBody("firstname", "First name cannot be empty.")
      .notEmpty();
    req
      .checkBody("firstname", "First name be less than 3 characters.")
      .isLength({ min : 3});
    req
      .checkBody("lastname", "Last name cannot be empty.")
      .notEmpty();
    req
      .checkBody("lastname", "Last name cannot be less than 3 characters.")
      .isLength({ min : 3});
    req
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
      req
      .checkBody("email", "Enter a valid email address.")
      .isLength({ min : 3});
    req
      .checkBody("phone", "Phone number can't be empty.")
      .notEmpty();
    req
      .checkBody("phone", "Phone number is not a valid phone number.")
      .isNumeric();
    req
      .checkBody("password", "Password can't be empty.")
      .notEmpty(); 
    req
      .checkBody("password", "Password can't be less than 8 characters.")
      .isLength({ min : 8});  
  },

  validateAddRecipes(req, res) {
    req
      .checkBody("title", "Title can't be empty.")
      .notEmpty();
    req
      .checkBody("title", "title can't be less than 5 characters.")
      .isLength({ min : 5}); 
    req
      .checkBody("image", "Please, select an image.")
      .notEmpty();
    req
      .checkBody("description", "Description can't be empty.")
      .notEmpty();
    req
      .checkBody("description", "description can't be less than 10 characters.")
      .isLength({ min : 10}); 
    req
      .checkBody("ingredients", "Ingredients can't be empty.")
      .notEmpty();
    req
      .checkBody("ingredients", "ingredients can't be less than 10 characters.")
      .isLength({ min : 10}); 
    req
      .checkBody("direction", "Direction can't be empty.")
      .notEmpty();
    req
      .checkBody("direction", "Direction ccan't be less than 10 characters.")
      .isLength({ min : 10});

      
  },

  validateReviewRecipe(req, res) {
    req
      .checkBody("comment", "Comment can't be empty.")
      .notEmpty();
    req
      .checkBody("comment", "Comment can't be less than 10 characters long.")
      .isLength({ min : 10 });
    req
      .checkBody("userId", "User ID  cannot be empty.")
      .notEmpty();
    req
      .checkBody("recipeId", "Recipe ID can't be empty.")
      .notEmpty();
  },

  validateId(id, req, res) {
      if (isNaN(id)) {
        return false
      } else { 
        return true; 
      }
  },

  confirmPassword(password1, password2, req, res) {
    if (password1 === password2) {
      return true;
    } else { 
      return false; 
    }
  }
};

export default validate;