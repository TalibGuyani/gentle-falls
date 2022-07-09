import jwt from 'jsonwebtoken';

const { TokenExpiredError } = jwt;

import { promisify } from 'util';

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyJwt = async (token) => {
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    return {
      decoded,
      isValid: true,
      isExpired: false,
    };
  } catch (error) {
    
    if (error instanceof TokenExpiredError) {
      return {
        decoded: null,
        isExpired: true,
        isValid: false,
      };
    }

    return {
      decoded: null,
      isExpired: false,
      isValid: false,
    };
  }
};

export default signJWT;
