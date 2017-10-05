/* eslint import/no-unresolved: 0 */
import jwt from 'jsonwebtoken';
import db from '../models';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
console.log(secretKey);
const Authenticate = {
  /**
   * Verify auth middleware
   *
   * @param {Object} req request object payload
   * @param {Object} res response object
   * @param {Function} next callback function
   */
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, secretKey, (err, result) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.decoded = result;
      next();
    });
  },

  hashPassword(paaword){
    const salt = bcrypt.genSaltSync(8);
    return  bcrypt.hashSync(password, salt);
  },

  comparePassword(password1, hashedPassword){
    if(bcrypt.compareSync(password1, hashedPassword)){
      return true;
    }
    return false;
  }
}
export default Authenticate;