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
			res.status(400).json({ message : errors });
			return;
		} else {
			db.Users.find({
				where: {
					email: req.body.email
				}
			}).then((user) => {
				if (user) {
					res.status(409).json({
						message: "User with email '" + req.body.email + "' already exists", 
						status: 409
					});
				} else {
					const {	firstname, lastname, email,	password,	phone	} = req.body;
					const data ={
						firstname : firstname,
						lastname : lastname,
						email : email,
						password : password,
						phone : phone,
						image : ''
					};
					db.Users.create(data).then((user) => {
						if (user) {
							const {	firstname, lastname, email,	phone, id, image	} = user;
							const jwtData = {
								firstname: firstname.trim(),
								lastname:  lastname.trim(),
								email: email.trim(),
								userId: id,
								phone : phone,
								image: image
							};
							const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
							user = Auth.filterUser(user);
							res.status(201).json({ status : 201, token, user });
						}
					})
						.catch(error => {
							 res.status(400).json({
								message: error.message,
								errors: error
							});
						});
				}
			})
				.catch((error) => {
					 res.status(500).json({ message : error });
				});
		}		
	}
	
	signin(req, res){
		validate.validateLogin(req, res);
		var errors = req.validationErrors();
		if (errors) {
			res.status(400).json({ status : 400, message : errors });
			return;
		} else {
			db.Users.findOne({ where: { email: req.body.email } })
			.then((user) => {	
      if (user && req.body.password && Auth.comparePassword(req.body.password, user.password)) {
        const token = jwt.sign({
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email,
					phone: user.phone,
					userId: user.id,
					image: user.image
        }, secretKey, { expiresIn: 86400 });
				user = Auth.filterUser(user);
        res.status(200).json({ status: 200, token, user });
      }else{
				 res.status(401).json({ status : 401, errors: { message: 'Email or Password Incorrect' } });
			}
      
    })
			.catch(error => {
				res.status(500).json({ status : 500,  message : error.message });
			});
		}
	}

	profile(req, res) {
		let id = req.body.id;
		// id = validate.validateId(id);
		db.Users.findById(id)
		.then((user) => {			
      if (user) {
        res.status(200).json({ status: 200, user : user });
			}else{
				res.status(409).json({
					message: "User with ID '" + id + "' doesn't exists", 
					status: 409
				});
			}  
		})
		.catch(err =>{
			res.status(500).json({ status : 500, message : error.message });
		});
	}
}

export default new Users();