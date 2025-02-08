import express from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { adminPermission } from '../middlewares/adminPermission.js';

const router = express.Router();

router.get('/api/v1/categories', getCategories);
router.post('/api/v1/category', verifyToken, adminPermission, createCategory);
router.put(
  '/api/v1/category/:id',
  verifyToken,
  adminPermission,
  updateCategory
);
router.delete(
  '/api/v1/category/:id',
  verifyToken,
  adminPermission,
  deleteCategory
);

export default router;
