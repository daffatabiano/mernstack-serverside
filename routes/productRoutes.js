import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productsController.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/product', createProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;
