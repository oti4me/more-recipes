import jwt_decode from 'jwt-decode';
import ValidatePassword from 'validate-password';

const options = {
  enforce: {
    lowercase: true,
    uppercase: true,
    specialCharacters: true,
    numbers: true
  }
};

const validator = new ValidatePassword(options);

const validate = {
  validateLogin(request, response) {
    request
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
    request
      .checkBody("password", "Password can't be empty.")
      .notEmpty();
  },

  validateSignup(request, response) {
    request
      .checkBody("firstname", "First name can't be empty.")
      .notEmpty();
    request
      .checkBody("firstname", "First name can't be less than 3 or more than 25 characters and must not contain numbers or spaces.")
      .matches(/^[a-zA-Z.]{3,25}$/);
    request
      .checkBody("lastname", "Last name can't be empty.")
      .notEmpty();
    request
      .checkBody("lastname", "Last name can't be less than 3 or more than 25 characters and must not contain numbers or spaces.")
      .matches(/^[a-zA-Z.]{3,25}$/);
    request
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
    request
      .checkBody("email", "Enter a valid email address.")
      .isLength({ min: 6 });
    request
      .checkBody("phone", "Phone number can't be empty.")
      .notEmpty();
    request
      .checkBody("phone", "Phone number must be a valid phone number and must not contain spaces.")
      .matches(/^[0-9\-.]{10,15}$/);
    request
      .checkBody("password", "Password can't be empty.")
      .notEmpty();
    request
      .checkBody("password", "Password can't be less than 8 characters and must not contain spaces.")
      .matches(/^[a-zA-Z0-9!@#$%^&*()_\-.]{8,32}$/);
    request
      .checkBody("confirmPassword", "Password confirmation field can't be empty.")
      .notEmpty();
    request
      .checkBody("password", "Password didn't match")
      .equals(request.body.confirmPassword);
  },

  validateAddRecipes(request, response) {
    request
      .checkBody("title", "Title can't be empty.")
      .notEmpty();
    request
      .checkBody("title", "title can't be less than 5 characters.")
      .isLength({ min: 5 });
    request
      .checkBody("image", "Please, select an image.")
      .notEmpty();
    request
      .checkBody("description", "Description can't be empty.")
      .notEmpty();
    request
      .checkBody("description", "description can't be less than 10 characters.")
      .isLength({ min: 10 });
    request
      .checkBody("ingredients", "Ingredients can't be empty.")
      .notEmpty();
    request
      .checkBody("ingredients", "ingredients can't be less than 10 characters.")
      .isLength({ min: 10 });
    request
      .checkBody("direction", "Direction can't be empty.")
      .notEmpty();
    request
      .checkBody("direction", "Direction ccan't be less than 10 characters.")
      .isLength({ min: 10 });
  },

  validateUdateRecipes(request, response) {
    request
      .checkBody("title", "title can't be less than 5 characters.")
      .notEmpty();
    request
      .checkBody("description", "description can't be less than 10 characters.")
      .notEmpty();
    request
      .checkBody("ingredients", "ingredients can't be less than 10 characters.")
      .notEmpty();
    request
      .checkBody("direction", "Direction can't be less than 10 characters.")
      .notEmpty();
  },
  validatevaVotes(request, response) {
    request
      .checkBody("voteType", "Vote type is required.")
      .notEmpty();
    request
      .checkBody("voteType", "Vote type must either be upvotes or downvotes.")
      .matches(/upvotes|downvotes/);
  },

  validateReviewRecipe(request, response) {
    request
      .checkBody("comment", "Comment can't be empty.")
      .notEmpty();
    request
      .checkBody("comment", "Review comment too short.")
      .isLength({ min: 5 });
  },

  validateId(id, request, response) {
    if (isNaN(id)) {
      return false
    } else {
      return true;
    }
  },

  validateStrengthPasswrod(password, request, response) {
    const passwordData = validator.checkPassword(password);
    return passwordData;
  }, 

  getUserId(request, response) {
    const token = request.headers.authorization || request.headers['x-access-token'];
    const user = jwt_decode(token);
    const { userId } = user;
    return userId;
  },
};

export default validate;