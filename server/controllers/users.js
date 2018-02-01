"use strict"
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import db from '../models';
import Auth from '../middleware/jwtMiddleware';
import validate from '../middleware/validate';


dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

/**
 * @description Class Definition for Users Object
 * 
 * @class Users
 */
class Users {

	/**
	 * @description Create a user account on the application
	 * 
	 * @param {object} request HTTP request object
	 * 
	 * @param {object} response HTTP response object
	 * 
	 * @returns {object} error messages object or success message object
	 * 
	 * @memberof Recipes
	*/
	signup(request, response) {
		validate.validateSignup(request, response);
		const errors = request.validationErrors();
		if (errors) {
			response.status(400).json({
				message: errors
			});
			return;
		} else {
			const { body: { firstName, lastName, email, password, phone } } = request;
			const passwordStrength = validate.validateStrengthPasswrod(
				password,
				request,
				response
			);
			if (!passwordStrength.isValid) {
				return response.status(400).json({
					message: [
						{
							msg: `Password must contain an uppercase, 
							a number, a special character and must 
							not be less than 8 characters`
						}
					]
				});
			}
			db.Users.find({
				where: {
					email
				}
			}).then((existingUser) => {
				if (existingUser) {
					return response.status(409).json({
						message: `User with email ${email} already exist`,
					});
				}
				else {
					const userDetails = {
						firstName,
						lastName,
						email,
						password,
						phone,
						imageUrl: ''
					};
					db.Users.create(userDetails).then((createdUser) => {
						if (createdUser) {
							const {
								firstName,
								lastName,
								email,
								phone,
								id,
							} = createdUser;

							const createdUserDetails = {
								firstName: firstName.trim(),
								lastName: lastName.trim(),
								email: email.trim(),
								phone: phone.trim(),
								userId: id,
							};

							const token = jwt.sign(createdUserDetails, secretKey, {
								expiresIn: 86400
							});
							const user = Auth.filterUser(createdUserDetails);
							response.status(201).json({
								token,
								user
							});
						}
					})
				}
			})
				.catch((error) => {
					response.status(500).json({
						message: error
					});
				});
		}
	}

	/**
   * @description Registered user to login to his account
   * 
	 * @param {object} request HTTP request object
	 *
	 * @param {object} response HTTP response object
	 *
	 * @returns {object} error messages object or success message object
	 *
	 * @memberof Recipes
  */
	signin(request, response) {
		validate.validateLogin(request, response);
		const errors = request.validationErrors();
		if (errors) {
			return response.status(400).json({
				message: errors
			});
		} else {
			const { email, password } = request.body;
			db.Users.findOne({ where: { email } })
				.then((user) => {
					if (user && password
						&& Auth.comparePassword(password, user.password)
					) {
						const {
							firstName, lastName, email, phone, id, imageUrl
						} = user;

						const token = jwt.sign({
							firstName,
							lastName,
							email,
							phone,
							imageUrl,
							userId: id
						}, secretKey, { expiresIn: 86400 });
						user = Auth.filterUser(user);
						response.status(200).json({
							token,
							user
						});
					} else {
						response.status(401).json({
							errors: {
								message: 'Email or Password Incorrect'
							}
						});
					}

				})
				.catch(error => {
					const { message } = error;
					response.status(500).json({
						message
					});
				});
		}
	}

}

export default new Users();