import User from '../models/user.model.js';
import { verifyJwt } from '../utils/jwt.utils.js';

export const deserialize = async (req, res, next) => {
  let token = req.cookies.jwt;

  const hasAuthHeader =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer');

  if (!token && hasAuthHeader) {
    token = req.headers.authorization.split(' ')[1];
  }

  

  if (token) {
    const { decoded } = await verifyJwt(token);
    
    if (decoded) {
      const currentUser = await User.findById(decoded.id);
      
      res.locals.user = currentUser;
    }
  }

  next();
};
