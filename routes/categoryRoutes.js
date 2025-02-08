import express from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/api/v1/categories', getCategories);
router.post('/api/v1/category', createCategory);
router.put('/api/v1/category/:id', updateCategory);
router.delete('/api/v1/category/:id', deleteCategory);

export default router;
