"use strict"
import jwt from 'jsonwebtoken';
import db from '../models';
import Auth from '../middleware/jwtMiddleware';

class Users{
	
	signup(req, res) {
		let { firstname, lastname,  email, password, phone } = req.body;

		console.log(password);
		const data = {firstname, lastname, email, password, phone};
		console.log(db.Users);
		db.Users.find({
			where: {
				$or:[
					{email: email},
				]
			}
		}).then((user) => {
			if (user) {
				return res.status(409).json({
					 message: `User with "${email}" already exists`, 
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

						const token = jwt.sign(jwtData, "oti4me", { expiresIn: 86400 });
						// user = UserHelper.transformUser(user);
						user = user;
						return res.status(201).json({ statusCode : 201, token, expiresIn: 86400, user });
					}
				})
					.catch(error => {
						console.log(error)
						return res.status(400).json({
							message: 'Bad request sent to the server',
							errors: error
						});
					});
			}
		})
			.catch((error) => {
				console.log(error);
				return res.status(500).json(error);
			});
	}
	
	signin(req, res){
		db.Users.findOne({ where: { email: req.body.email } }).then((user) => {			
      if (user && req.body.password && Auth.comparePassword(req.body.password, user.password)) {
        const token = jwt.sign({
					firstname: user.firstname,
					lastname: user.lastname,
          email: user.email,
          userId: user.id,
        }, "oti4me", { expiresIn: 86400 });

        // user = UserHelper.transformUser(user);
        return res.status(200).json({ statusCode: 200, token, expiresIn: 86400, user });
      }
      
      return res.status(401).json({ errors: { message: 'Failed to authenticate user' } });
    })
			.catch(error => {
				console.log(error);
				res.status(500).json({ error });

			});
	}

	profile(req, res) {
		db.Users.findById()
		.then((user) => {			
      if (user ) {
        res.json(user);
			}  
		})
	}

}

export default new Users();