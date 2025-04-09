const socketMiddleware = (req, res, next) => {
  req.io = req.app.get('io');
  next();
};

export default socketMiddleware;
