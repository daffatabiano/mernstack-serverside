import express from 'express';
import {
  createOrder,
  getOrders,
  collectOrders,
  clearHistoryOrders,
  historyOrders,
  cancelledOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/api/v1/order', verifyToken, createOrder); //client route
router.get('/api/v1/orders', verifyToken, getOrders); // cashier route
router.get('api/v1/order/:id', verifyToken, getOrderById); //cashier route
router.put('/api/v1/cashier/collect-orders/:id', verifyToken, collectOrders); //cashier route
router.delete('/api/v1/cashier/cancel-order/:id', verifyToken, cancelledOrders); //cashier route
router.get('/api/v1/cashier/history-orders', verifyToken, historyOrders); //cashier route & client route
router.delete(
  '/api/v1/cashier/clear-history-orders',
  verifyToken,
  clearHistoryOrders
); //cashier route & client route

export default router;
