import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: 'Invalid token',
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
};
