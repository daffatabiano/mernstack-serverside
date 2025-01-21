import User from '../models/adminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Customer from '../models/customerModel.js';
import Voucher from '../models/voucherModel.js';

export const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Passwords do not match',
      });
    }

    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'User already exists',
      });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      born_date: req.body.born_date,
      gender: req.body.gender,
    });
    const user = await newUser.save();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User created successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        born_date: user.born_date,
        image: user.image,
        gender: user.gender,
      },
      user,
      token: 'Bearer ' + token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: users.map((user) => {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          born_date: user.born_date,
          gender: user.gender,
          createdAt: user.createdAt,
        };
      }),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        born_date: user.born_date,
        gender: user.gender,
        date: user.date,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err || 'User not found',
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'No data provided',
      });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User updated successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const changePassword = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    req.body.confirmPassword = await bcrypt.hash(
      req.body.confirmPassword,
      salt
    );
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Passwords do not match',
      });
    }
  } else {
    delete req.body.password;
    delete req.body.confirmPassword;
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Password updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const giftVoucherCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate({
      $or: [{ phone: req.params.phone }, { email: req.params.email }],
    });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const giftVoucher = await Voucher.findById(req.params.id);

    if (!giftVoucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }

    customer.voucher.push(giftVoucher);
    await customer.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Voucher Sending Successfully',
      data: giftVoucher,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};
