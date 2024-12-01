import express from 'express';
import {
  createOrder,
  getOrders,
  collectOrders,
  clearHistoryOrders,
  historyOrders,
  cancelledOrders,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/api/v1/order', createOrder); //client route
router.get('/api/v1/orders', getOrders); // cashier route
router.put('/api/v1/cashier/collect-orders/:id', collectOrders); //cashier route
router.delete('/api/v1/cashier/cancel-order/:id', cancelledOrders); //cashier route
router.get('/api/v1/cashier/history-orders', historyOrders); //cashier route & client route
router.delete('/api/v1/cashier/clear-history-orders', clearHistoryOrders); //cashier route & client route

export default router;
