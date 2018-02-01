# More Recipes

[![Build Status](https://travis-ci.org/oti4me/More-Recipes.svg?branch=development)](https://travis-ci.org/oti4me/More-Recipes)
[![Maintainability](https://api.codeclimate.com/v1/badges/4dfcbf4bb224fdab4624/maintainability)](https://codeclimate.com/github/oti4me/More-Recipes/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/oti4me/More-Recipes/badge.svg?branch=development)](https://coveralls.io/github/oti4me/More-Recipes?branch=development)

## Introduction
**`More Recipes`** is a simple Application that allows users create and manage recipes. It has the following features; 
* User  Signup
* User Signin
* Add recipe
* Update recipe
* Delete recipe
* Add a recipe to my favourite collection
* Remove a Recipe from my favourite collection
* vote up a recipe (Like)
* Vote down a recipe (Dislike)
* Review a recipe

## Installation and Setup
*  Install NodeJs
*  Install Postgres
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.

    > git clone https://github.com/oti4me/More-Recipes.git

*  Navigate to the repo's folder on your computer
  *  `cd More-Recipes/`
* Install the application's dependencies using `npm install`

  #### Note
  * In order to begin using, you need to have [NodeJs](https://nodejs.org) and **npm** installed on your system.
  * For database you need to install __PostGres__ locally or setup with an online client eg. **ElephantSql**
  * Setup Database according to setting in server/config/config.js and the env.example file.
  * Migrate to database sequelize db:migrate
  * Create two (2) databases one for __development__ and the other for **testing**
  * Change database config variables in the config.json and .env file, based on your own db set-up
  * In other to interact effectively with endpoints, install and use [Postman](https://www.getpostman.com/)

* Run the app
  *  `npm run start:dev`
  *  Running the command above will run the app at `localhost://3001`.

## Dependencies
* See Package.json for reference

## Tests
*  The tests have been written using **[Mocha](https://www.npmjs.com/package/mocha)** , **[Chai](https://www.npmjs.com/package/chai)** as it's assertion library and **[Supertest](https://www.npmjs.com/package/supertest)** class.
*  To run the tests, navigate to the project's folder and open
*  Issue the following command on terminal.
  *  `npm test`
*  If the tests are successful, they will complete without failures or errors.

## Technologies
 * [ECMAScript 6](http://es6-features.org/): This is the newest version of JavsScript with new features such as arrow functions, spread and rest operators and many more.
 * [REACT](https://facebook.github.io/react/): REACT is a JavaScript framework developed by Facebook and it is used for developing web application. REACT is the 'VIEW' in the MVC architecture.
 * [REDUX](): Redux is a predictable state container for JavaScript apps
 * [Babel:](https://babeljs.io/)  Babel is used to transpile es6 down to es5.
 * [Webpack:](https://webpack.github.io/docs/what-is-webpack.html)  Webpack is used to bundle modules with dependencies and run mundane tasks.
 * [Axios:](https://www.npmjs.com/package/axios)  Axios is an http client library used in making API calls.

 
# Coding Style
- Airbnb 

# Language
- Javascript

## Api Documentation
*[Click here to see the api documentation](https://more-recipes-otighe.herokuapp.com/documentation)

## Limitations
+ Users cannot delete user account

## Contributions
 Contributions are always welcome. If you are interested in enhancing the features in the project, follow these steps below:
 + Fork the project to your repository then clone it to your local machine.
 + Create a new branch and make features that will enhance it.
 + If the you wish to update an existing enhancement submit a pull request.
 + If you find bugs in the application, create a `New Issue` and let me know about it.
 + If you need clarification on what is not clear, contact me via mail [henry.otighe@andela.com](mailto:henry.otighe@andela.com)
 + Comvention used in this project is found in this [Wiki](https://github.com/oti4me/More-Recipes/wiki)

## Author
    Henry Otighe

## License & Copyright
MIT © [Henry Otighe](https://github.com/oti4me)

Licensed under the [MIT License](https://github.com/oti4me/More-Recipes/blob/development/LICENSE).
