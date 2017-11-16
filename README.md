# More-Recipes

A simple App that allows users create and manage recipes

It provides restful APIs for users to create recipes, review recipes and favourite a recipe based on userId and managing authentication of users with JsonWebToken.

[![Build Status](https://travis-ci.org/oti4me/More-Recipes.svg?branch=development)](https://travis-ci.org/oti4me/More-Recipes)
[![Maintainability](https://api.codeclimate.com/v1/badges/4dfcbf4bb224fdab4624/maintainability)](https://codeclimate.com/github/oti4me/More-Recipes/maintainability)
##### Hosted App on Heroku 

[Heroku hosted](http://more-recipes-otighe.heroku.com)

### Key Application Features

A user can perform the following: 
- Create an account 
- Login to account 
- User can create a recipe 
- User remove a recipe 
- User update a recipe
- Users can search for recipe.
- Users can vote up or down a recipe.
- Users can favourite a recipe.
- Logout.


##### Authentication: Users are authenticated and validated using JsonWebToken.

### Development

This application was developed using NodeJs with express for routing. Postgres was used for persisting data.

The frontend was built using html, css and javascript.

### Installation

- Clone the project repository.
- Run git clone (https://github.com/oti4me/More-Recipes) 
more info: (https://help.github.com/articles/cloning-a-repository/)
- Run ``` npm install ``` to install the dependencies in the package.json file.
- Create Postgresql database and run ```sequelize db:migrate npm undo and npm redo ```(https://www.postgresql.org/)

#### Usage

Login, Sign Up and start creating recipes

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
