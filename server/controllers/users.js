"use strict"
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import db from '../models';
import Auth from '../middleware/jwtMiddleware';
import validate from '../middleware/validate';


dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
/**
 * 
 * 
 * @class Users
 */
class Users{
	
	/**
	 * A method that allows a user to create an app in the application
	 * 
	 * @returns {object} insertion error messages object or success message object
	 * @param {object} request 
	 * @param {object} response 
	 * @memberof Recipes
	*/
	signup(request, response) {
		validate.validateSignup(request, response);
		var errors = request.validationErrors();
		if (errors) {
			response.status(400).json({ succes: false, message : errors });
			return;
		} else {
			const {	firstname, lastname, email,	password,	phone, confirmPassword	} = request.body;
			const passwordMatch = validate.confirmPassword(password, confirmPassword);
			if(!passwordMatch){
				return response.status(400).json({
					message: "Password did not match", 
					succes: false
				}); 
			}
			const passwordStrength = validate.validateStrengthPasswrod(password, request, response);
			if(!passwordStrength.isValid){
				return response.status(400).json({
					message: "Password must contain one uppercase and a special character", 
					succes: false
				});
			}
			db.Users.find({
				where: {
					email: request.body.email
				}
			}).then((existingUser) => {
				if (existingUser) {
					response.status(409).json({
						message: "User with email '" + email + "' already exists", 
						succes: false
					});
				} 
				else {
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
							response.status(201).json({ succes: true, token, user });
						}
					})
				}
			})
			.catch((error) => {
				response.status(500).json({ succes: false, message : error });
			});
		}		
	}

	/**
   * A method that allows a user to login to his account
   * 
   * @returns {object} insertion error messages object or success message object
   * @param {object} req 
   * @param {object} res 
   * @memberof Recipes
  */
	signin(req, res){
		validate.validateLogin(req, res);
		var errors = req.validationErrors();
		if (errors) {
			res.status(400).json({ succes: false, message : errors });
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
        res.status(200).json({ succes: true, token, user });
      }else{
				res.status(401).json({ succes: false, errors: { message: 'Email or Password Incorrect' } });
			}
      
    })
			.catch(error => {
				res.status(500).json({ succes: false,  message : error.message });
			});
		}
	}
	/**
	 * A method that allows a user to view his profile details
	 * 
	 * @returns {object} insertion error messages object or success message object
	 * @param {object} req 
	 * @param {object} res 
	 * @memberof Recipes
	*/
	profile(req, res) {
		let id = req.body.id;
		if(validate.validateId(id)){
			db.Users.findById(id)
			.then((user) => {			
				if (user) {
					res.status(200).json({ succes: true, user });
				}else{
					res.status(404).json({
						message: "User with ID '" + id + "' doesn't exists", 
						succes: false
					});
				}  
			})
			.catch(err =>{
				res.status(500).json({ succes: false, message : err.message });
			});
		}else{
			res.status(400).json({ succes: false, message : 'ID is not a valid integer' });
		}
	}
		
}

export default new Users();