import jwt_decode from 'jwt-decode';
import ValidatePassword from 'validate-password';
import * as dotenv from 'dotenv';
import db from '../models';

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;


const options = {
  enforce: {
    lowercase: true,
    uppercase: true,
    specialCharacters: true,
    numbers: true
  }
};

const passwordValidator = new ValidatePassword(options);

const validator = {
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
      .checkBody("firstName",
      "First name can't be less than 3 or more than 25 characters and must not contain numbers or spaces."
      )
      .matches(/^[a-zA-Z.]{3,25}$/);
    request
      .checkBody("lastName",
      "Last name can't be less than 3 or more than 25 characters and must not contain numbers or spaces."
      )
      .matches(/^[a-zA-Z.]{3,25}$/);
    request
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
    request
      .checkBody("phone",
      "Phone number must be a valid phone number and must not contain spaces."
      )
      .matches(/^[0-9\-.]{8,15}$/);
    request
      .checkBody("password",
      "Password can't be less than 8 characters and must not contain spaces."
      )
      .matches(/^[a-zA-Z0-9!@#$%^&*()_\-.]{8,32}$/);
    request
      .checkBody("confirmPassword",
      "Password confirmation field can't be empty."
      )
      .notEmpty();
    request
      .checkBody("password", "Password didn't match")
      .equals(request.body.confirmPassword);
  },

  validateAddRecipes(request, response) {
    request
      .checkBody("title", "Title can't be less than 5 characters.")
      .isLength({ min: 5 });
    request
      .checkBody("imageUrl", "Please, select an image.")
      .notEmpty();
    request
      .checkBody("description", "Description can't be less than 10 characters.")
      .isLength({ min: 10 });
    request
      .checkBody("ingredients", "ingredients can't be less than 10 characters.")
      .isLength({ min: 10 });
    request
      .checkBody("direction", "Direction ccan't be less than 10 characters.")
      .isLength({ min: 10 });
  },

  validateUdateRecipes(request, response) {
    request
      .checkBody("title", "Title can't be less than 5 characters.")
      .matches(/^[a-zA-Z.]{5,25}$/);
    request
      .checkBody("description", "Description can't be less than 10 characters.")
      .matches(/^[a-zA-Z0-9.]{10,25}$/);
    request
      .checkBody("ingredients", "Ingredients can't be less than 10 characters.")
      .matches(/^[a-zA-Z0-9.]{10,25}$/);
    request
      .checkBody("direction", "Direction can't be less than 10 characters.")
      .matches(/^[a-zA-Z0-9.]{10,25}$/);
    request
      .checkBody("imageUrl", "ImageUrl can't be less than 10 characters.")
      .notEmpty();
  },

  validateReviewRecipe(request, response) {
    request
      .checkBody("comment", "Comment can't be empty.")
      .notEmpty();
    request
      .checkBody("comment", "Review comment too short.")
      .isLength({ min: 5 });
  },

  validateId(id) {
    if (isNaN(id)) {
      return false
    }
    return true
  },

  validateStrengthPasswrod(password, request, response) {
    const validatedPassword = passwordValidator.checkPassword(password);
    return validatedPassword;
  },

  getUserId(request, response) {
    const token = request.headers.authorization
      || request.headers['x-access-token'];
    if (!token) {
      return response.status(401).send({ message: 'Unauthorized Access' });
    }
    const user = jwt_decode(token);
    const { userId } = user;
    return userId;
  },
};

export default validator;