import express from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  getAllUsers,
  giftVoucherCustomer,
  changePassword,
  changeRole,
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { adminPermission } from '../middlewares/adminPermission.js';

const router = express.Router();

router.post('/api/v1/auth/register', createUser);
router.post('/api/v1/auth/login', login);
router.get('/api/v1/users', verifyToken, getAllUsers);
router.get('/api/v1/user/:id', verifyToken, getUserById);
router.post(
  '/api/v1/user/:id/change-role',
  verifyToken,
  adminPermission,
  changeRole
);
router.post('/api/v1/gift-voucher', verifyToken, giftVoucherCustomer);
router.put('/api/v1/user/:id', verifyToken, updateUser);
router.put('/api/v1/user-change-password/:id', verifyToken, changePassword);
router.delete('/api/v1/user/:id', verifyToken, adminPermission, deleteUser);

export default router;
