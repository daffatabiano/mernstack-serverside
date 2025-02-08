import User from '../models/adminModel.js';

export const adminPermission = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user?.role !== 'manager') {
    return res
      .status(403)
      .json({ message: 'You are not allowed to access this route' });
  }
  next();
};
