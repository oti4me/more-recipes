# More-Recipes

A simple App that allows users create and manage recipes [Heroku hosted](http://more-recipes-otighe.heroku.com)

It provides restful APIs for users to create recipes, review recipes and favourite a recipe based on userId and managing authentication of users with JsonWebToken.

[![Build Status](https://travis-ci.org/oti4me/More-Recipes.svg?branch=development)](https://travis-ci.org/oti4me/More-Recipes)
[![Maintainability](https://api.codeclimate.com/v1/badges/4dfcbf4bb224fdab4624/maintainability)](https://codeclimate.com/github/oti4me/More-Recipes/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/oti4me/More-Recipes/badge.svg?branch=staging)](https://coveralls.io/github/oti4me/More-Recipes?branch=staging)

##### Hosted App on Heroku 

[Heroku hosted](http://more-recipes-otighe.heroku.com)

### Key Application Features

A user can perform the following: 
- Create an account 
- Login to account 
- User can create a recipe 
- User can remove a recipe he added 
- User can update a recipe he added
- Users can search for recipes.
- Users can vote up or down a recipe.
- Users can review recipes.
- Users can favourite a recipe.
- Logout.


##### Authentication: Users are authenticated and validated using JsonWebToken.

### Development

This application was developed using NodeJs with Express for routing. Postgres was used for persisting data.

The frontend was built using HTML,CSS and JavaScript.

### Installation

- Clone the project repository.
- Run git clone (https://github.com/oti4me/More-Recipes) 
more info: (https://help.github.com/articles/cloning-a-repository/)
- Run ``` npm install ``` to install the dependencies in the package.json file.
- Create Postgresql database and run ```sequelize db:migrate npm undo and npm redo ```(https://www.postgresql.org/)

<!-- ## API Documentation -->

<!-- Navigate to `localhost:3001/api-docs` on your browser and select HTTP protocol to view/test Swagger API documentation -->


## API Routes

* [Signup] - POST http://localhost:3000/api/v1/users/signup
* [Signin] - POST http://localhost:3000/api/v1/users/signin
* [Create Recipe] - POST http://localhost:3000/api/v1/recipes
* [Modify Recipe] - PUT http://localhost:3000/api/v1/recipes/:id
* [Delete Recipe] - DELETE http://localhost:3000/api/v1/recipes/:id
* [Fetch All Recipes] - GET http://localhost:3000/api/v1/recipes
* [Fetch Recipes by Most Upvotes] - GET http://localhost:3000/api/v1/recipes?sort=upvotes&order=desc
* [Fetch My Recipes] - GET http://localhost:3000/api/v1/users/recipes
* [Post Recipe Review] - POST http://localhost:3000/api/v1/recipes/:id/reviews
* [Fetch Recipe Reviews] - GET http://localhost:3000/api/v1/recipes/:id/reviews
* [Add Recipe to Favorites] - POST http://localhost:3000/api/v1/users/:userId/recipes
* [Remove Recipe from Favorites] - DELETE http://localhost:3000/api/v1/users/:id/recipes
* [Get Favaorite Recipes] - GET http://localhost:3000/api/v1/users/:id/recipes
* [Upvote Recipe] - POST http://localhost:3000/api/v1/recipes/:recipeId/upvotes
* [Downvote Recipe] - POST http://localhost:3000/api/v1/recipes/:recipeId/downvotes


### Usage

 Sign Up, Login, and start creating recipes

### Technologies Used

- JavaScript (ES6) (http://es6-features.org/)
- Node.js (https://nodejs.org/en/)
- Express (https://www.npmjs.com/package/express-api)
- Sequelize ORM (http://docs.sequelizejs.com/)
- Material Design CSS Framework (http://materializecss.com/)
- Postgres (https://www.postgresql.org/)

### Contributing

- Fork this repositry to your account.
- Clone your repositry: ``` git clone ```
https://github.com/oti4me/More-Recipes.git.
- Create your feature branch: ``` git checkout -b new-feature ```
- Commit your changes: ``` git commit -m "did something" ```
- Push to the remote branch: ``` git push origin new-feature ```
- Open a pull request.

#### Licence

ISC

Copyright (c) 2017 Otighe Henry
