import express from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  getAllUsers,
  giftVoucherCustomer,
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/api/v1/auth/register', createUser);
router.post('/api/v1/auth/login', login);
router.get('/api/v1/users', verifyToken, getAllUsers);
router.get('/api/v1/user/:id', verifyToken, getUserById);
router.post('/api/v1/gift-voucher', verifyToken, giftVoucherCustomer);
router.put('/api/v1/user/:id', verifyToken, updateUser);
router.delete('/api/v1/user/:id', verifyToken, deleteUser);

export default router;
