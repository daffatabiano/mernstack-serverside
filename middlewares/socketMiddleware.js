const socketMiddleware = (req, res, next) => {
  req.io = io;
  next();
};

export default socketMiddleware;
