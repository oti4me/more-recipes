const validate = {
  validateLogin(req, res) {
    req
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
    req
      .checkBody("password", "Password can't be empty.")
      .notEmpty();
  },

  validateSignup(req, res) {
    req
      .checkBody("firstname", "First name cannot be empty.")
      .notEmpty();
    req
      .checkBody("lastname", "Last name cannot be empty.")
      .notEmpty();
    req
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
    req
      .checkBody("phone", "Phone number can't be empty.")
      .notEmpty();
    req
      .checkBody("password", "Password can't be empty.")
      .notEmpty();      
  },

  validateAddRecipes(req, res) {
    req
      .checkBody("title", "Title can't be empty.")
      .notEmpty();
    req
      .checkBody("image", "Please, select an image.")
      .notEmpty();
    req
      .checkBody("description", "Description can't be empty.")
      .notEmpty();
    req
      .checkBody("ingredients", "Ingredients can't be empty.")
      .notEmpty();
    req
      .checkBody("direction", "Direction can't be empty.")
      .notEmpty();
  },

  validateId(id, req, res) {
      if (isNaN(id)) {
        return false
      } else { 
        return true; 
      }
  }

};

export default validate;