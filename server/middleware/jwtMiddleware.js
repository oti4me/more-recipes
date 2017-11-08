import jwt from 'jsonwebtoken';
import db from '../models';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
const Authenticate = {

  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
       res.status(401).send({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, secretKey, (err, result) => {
      if (err) {
         res.status(401).send({ message: 'Invalid Token' });
      }
      req.decoded = result;
      next();
    });
  },

  hashPassword(paaword){
    const salt = bcrypt.genSaltSync(8);
    return  bcrypt.hashSync(password, salt);
  },

  filterUser(user){
    const newUser = {};
    newUser.firstname = user.firstname;
    newUser.lastname = user.lastname;
    newUser.email = user.email;
    newUser.phone = user.phone;
    newUser.image = user.image;
    newUser.userId = user.id;
   
    return newUser;
  },

  comparePassword(password1, hashedPassword){
    if(bcrypt.compareSync(password1, hashedPassword)){
      return true;
    }
    return false;
  }
}
export default Authenticate;