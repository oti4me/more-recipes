"use strict"
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import validator from 'validator';
import db from '../models';
import Auth from '../middleware/jwtMiddleware';
import validate from '../middleware/validate';


dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

class Favourites{

	favourites(req, res) {
    const id = req.params.id;
    if(validate.validateId(id)){
      res.status(400).json({ status: 400, message : 'ID is not a valid interger' });
    }
		db.Favourites.findAll({ where : { userId : id}})
		.then((favourites) => {			
      if (favourites ) {
         res.status(200).json({ status: 200, data: favourites });
			}  
		})
		.catch(err => {
			res.status(500).json({ status: 500, message: err.message });
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

export default new Favourites();