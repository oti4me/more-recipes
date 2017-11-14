"use strict"
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import validator from 'validator';
import db from '../models';
import Auth from '../middleware/jwtMiddleware';
import validate from '../middleware/validate';


dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

class Users{
	
	signup(req, res) {
		 
		validate.validateSignup(req, res);
		var errors = req.validationErrors();
		if (errors) {
			res.status(400).json({ status: 400, errors: errors });
			return;
		} else {
			
			let { firstname, lastname, email, phone, password, image } = req.body;

			const data = {
				firstname : firstname.trim(),
				lastname : lastname.trim(),
				email : email.trim(),
				phone : phone.trim(),
				password : password.trim(),
				image : image
			}

			db.Users.findOne({
				where: {
						email: data.email
				}
			}).then((user) => {
				console.log('data values ',data);
				if (user) {
						 res.status(409).json({
						 message: "User with email '" + data.email + "' already exists", 
						 status: 409
						});
				} else {					
					db.Users.create(data).then((user) => {
						if (user) {
							const jwtData = {
								firstname: user.firstname.trim(),
								lastname:  user.lastname.trim(),
								email: user.email.trim(),
								userId: user.id,
								phone: user.phone
							};
	
							const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
							user = Auth.filterUser(user);
							res.status(201).json({ status : 201, token, user });
						}
					})
						.catch(error => {
							 res.status(400).json({
								message: 'Bad request',
								errors: error
							});
						});
				}
			})
				.catch((error) => {
					 res.status(500).json(error);
				});
		}		
	}
	
	signin(req, res){
		validate.validateLogin(req, res);
		var errors = req.validationErrors();
		if (errors) {
			res.status(400).json({ status: 400, errors: errors });
			return;
		} else {
			const { email, password } = req.body;
			db.Users.findOne({ where: { email } }).then((user) => {			
      if (user && password && Auth.comparePassword(password, user.password)) {
        const token = jwt.sign({
					firstname: user.firstname,
					lastname: user.lastname,
          email: user.email,
          userId: user.id,
        }, secretKey, { expiresIn: 86400 });

        user = Auth.filterUser(user);
         res.status(200).json({ status: 200, token, user });
      }else{
				res.status(401).json({ errors: { message: 'Failed to authenticate user' } });
			}
    })
			.catch(error => {
				res.status(500).json({ error });
			});
		}
		
	}

	profile(req, res) {
		db.Users.findById()
		.then((user) => {			
      if (user ) {
        res.json(user);
			}  
		})
		.catch(err =>{
			res.status(500).json({ error });
		});
	}

	favourites(req, res) {
		db.Favourites.findAll({ where : { userId : req.params.id}})
		.then((favourites) => {			
      if (favourites ) {
         res.status(200).json({ status: 200, token, favourites });
			}  
		})
		.catch(err => {
			res.status(200).json({ status: 200, token, favourites });
		});
	}

	addFavourites(req, res) {
		db.Favourites.create()
		.then((favourites) => {			
      if (favourites ) {
         res.status(201).json({ status: 20, token, favourites });
			}  
		})
		.catch(err => {
			res.status(200).json({ status: 200, token, favourites });
		});
	}


}

export default new Users();