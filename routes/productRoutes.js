import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productsController.js';

const router = express.Router();

router.get('/api/v1/products', getProducts);
router.get('/api/v1/products/:id', getProductById);
router.post('/api/v1/product', createProduct);
router.put('/api/v1/product/:id', updateProduct);
router.delete('/api/v1/product/:id', deleteProduct);

export default router;
