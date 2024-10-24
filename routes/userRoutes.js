import express from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  getAllUsers,
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/auth/register', createUser);
router.post('/auth/login', login);
router.get('/users', verifyToken, getAllUsers);
router.get('/user/:id', verifyToken, getUserById);
router.put('/user/:id', verifyToken, updateUser);
router.delete('/user/:id', verifyToken, deleteUser);

export default router;
