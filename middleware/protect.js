
export const protect = (req, res, next) => {
  if (!res.locals?.user) {
    return res.status(403).json({ status: 'error', message: 'Please Signin' });
  }

  next();
};
