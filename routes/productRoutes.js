import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productsController.js';
import { adminPermission } from '../middlewares/adminPermission.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/api/v1/products', getProducts);
router.get(
  '/api/v1/products/:id',
  verifyToken,
  adminPermission,
  getProductById
);
router.post('/api/v1/product', verifyToken, adminPermission, createProduct);
router.put('/api/v1/product/:id', verifyToken, adminPermission, updateProduct);
router.delete(
  '/api/v1/product/:id',
  verifyToken,
  adminPermission,
  deleteProduct
);

export default router;
