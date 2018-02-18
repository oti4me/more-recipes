import jsonwebtoken from 'jsonwebtoken';
import db from '../../models';

const {
  Users, Recipes, Reviews
} = db;

const users = [
  {
    firstName: 'Make',
    lastName: 'Music',
    email: 'makemusic@gmail.com',
    phone: '07067143161',
    password: 'Oti4live@',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    firstName: 'Robinson',
    lastName: 'James',
    email: 'james@gmail.com',
    phone: '07067143161',
    password: 'Oti4live@',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];

const recipes = [
  {
    title: 'Fried Rice',
    description: 'Just the way you like it',
    ingredients: 'salt;;water;;sugar',
    imageUrl: 'img.jpg',
    direction: 'Put the rice on the water and start cooking yourself',
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    title: 'Jollof Rice',
    description: 'Just the way you like it',
    ingredients: 'salt;;water;;sugar',
    imageUrl: 'img.jpg',
    direction: 'Put the rice on the water and start cooking yourself',
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    title: 'Rice and Beans',
    description: 'Put the rice on the water and start cooking yourself',
    ingredients: 'salt;;maggi;;sugar',
    imageUrl: 'img.jpg',
    procedure: 'Put the rice on the water and start cooking yourself',
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 2,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    title: 'Beans and yam',
    description: 'Put the rice on the water and start cooking yourself',
    ingredients: 'salt;;maggi;;sugar',
    imageUrl: 'img.jpg',
    procedure: 'Put the rice on the water and start cooking yourself',
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 2,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    title: 'Beans and dodo',
    description: 'Put the rice on the water and start cooking yourself',
    ingredients: 'salt;;maggi;;sugar',
    imageUrl: 'img.jpg',
    procedure: 'Put the rice on the water and start cooking yourself',
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 2,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    title: 'Eba and soup',
    description: 'Put the rice on the water and start cooking yourself',
    ingredients: 'salt;;maggi;;sugar',
    imageUrl: 'img.jpg',
    procedure: 'Put the rice on the water and start cooking yourself',
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 2,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

const reviews = [
  {
    recipeId: 1,
    userId: 1,
    comment: 'This is a test review 2',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    recipeId: 2,
    userId: 1,
    comment: 'This is a test review 3',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    recipeId: 1,
    userId: 1,
    content: 'This is a test review 4',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    recipeId: 1,
    userId: 1,
    content: 'This is a test review 5',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

/**
 * @description Insert seed data in user model
 *
 * @returns {void} Nothing
 */
export const insertUserSeed = () => {
  Users.bulkCreate(users);
};

/**
 * @description Insert seed data in recipe model
 *
 * @returns {void} Nothing
 */
export const insertRecipeSeed = () => {
  Recipes.bulkCreate(recipes);
};

/**
 * @description Insert seed data in reviews model
 *
 * @returns {undefined} Nothing
 */
export const inserReviewSeed = () => {
  Reviews.bulkCreate(reviews);
};

/**
 * @description Generates token from seed data
 *
 * @param {Number} id - User object
 *
 * @returns {string} token - Generated token
 */
const generateToken = (id) => {
  const { email, phone } = users[0];
  const { JWT_SECRET_KEY } = process.env;
  const token = jsonwebtoken.sign({
    userId: id,
    email,
    phone,
  }, JWT_SECRET_KEY, {
      expiresIn: 86400
    });
  return token;
};

export const user1token = generateToken(1);
export const user2token = generateToken(2);

export const validUser = {
  firstName: 'Adam',
  lastName: 'Smith',
  email: 'adamsmith@yahoo.com',
  phone: '07067143161',
  confirmPassword: 'BioHazard@1',
  password: 'BioHazard@1',
  image: ''
};

export const validRecipe = {
  title: 'Beans yam',
  description: 'Just the way you like it',
  ingredients: 'salt;;water;;sugar',
  direction: 'Put the rice on the water and start cooking yourself',
  userId: 1,
  imageUrl: 'image/img.log'
};

export const recipeWithNoTitle = {
  title: '',
  description: 'Just the way you like it',
  ingredients: 'salt;;water;;sugar',
  direction: 'Put the rice on the water and start cooking yourself',
  imageUrl: 'image/img.log',
  userId: 1
};

export const recipeWithNoDescription = {
  title: 'Fried Rice',
  description: '',
  ingredients: 'salt;;water;;sugar',
  direction: 'Put the rice on the water and start cooking yourself',
  userId: 1,
  imageUrl: 'image/img.log'
};

export const recipeWithNoIngredient = {
  title: 'Fried Rice',
  description: 'salt;;water;;sugar',
  ingredients: '',
  direction: 'Put the rice on the water and start cooking yourself',
  userId: 1,
  imageUrl: 'image/img.log'
};

export const recipeWithNoDirection = {
  title: 'Fried Rice',
  description: 'Just the way you like it',
  ingredients: 'Put the rice on the water and start cooking yourself',
  direction: '',
  userId: 1,
  imageUrl: 'image/img.log'
};
export const validReview = {
  comment: 'I love this food',
  recipeId: 1,
  userId: 1,
};

export const reviewWithNoContent = {
  comment: '',
  recipeId: 1,
  userId: 1
};

export const validVote = {
  recipeId: 1,
  userId: 1
};

export const validFavorite = {
  recipeId: 1,
  userId: 1
};

export const inValidRecipeId = {
  recipeId: 453,
  userId: 1
};

export const inValidUserId = {
  recipeId: 1,
  userId: 203
};

export const userWithNoEmail = {
  firstName: 'Robinson',
  lastName: 'James',
  email: '',
  phone: '07067143161',
  password: 'Oti4live@',
  confirmPassword: 'Oti4live@',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const userWithNoFirstName = {
  firstName: '',
  lastName: 'James',
  email: 'james@gmail.com',
  phone: '07067143161',
  password: 'Oti4live@gmail.com',
  confirmPassword: 'Oti4live@gmail.com',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const userWithNoLastName = {
  firstName: 'Robinson',
  lastName: '',
  email: 'james@gmail.com',
  phone: '07067143161',
  password: 'Oti4live@gmail.com',
  confirmPassword: 'Oti4live@gmail.com',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
export const userWithNoPassword = {
  firstName: 'Robinson',
  lastName: 'James',
  email: 'james@gmail.com',
  phone: '07067143161',
  password: '',
  confirmPassword: 'niceone',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const badEmail = {
  firstName: 'Robinson',
  lastName: 'James',
  email: 'james@',
  phone: '07067143161',
  password: 'Oti4live@',
  confirmPassword: 'niceone',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const duplicateEmail = {
  firstName: 'Robinson',
  lastName: 'James',
  email: 'james@gmail.com',
  phone: '07067143161',
  password: 'Oti4live@',
  confirmPassword: 'niceone',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const checkPassword = {
  firstName: 'Robinson',
  lastName: 'James',
  email: 'james@gmail.com',
  phone: '07067143161',
  password: 'niceone',
  confirmPassword: 'niceone',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};