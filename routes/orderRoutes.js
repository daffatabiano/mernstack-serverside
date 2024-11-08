import express from 'express';
import {
  createOrder,
  getOrders,
  collectOrders,
  clearHistoryOrders,
  historyOrders,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/api/v1/order', createOrder);
router.get('/api/v1/orders', getOrders);
router.put('/api/v1/cashier/collect-orders/:id', collectOrders);
router.delete('/api/v1/cashier/clear-history-orders', clearHistoryOrders);
router.get('api/v1/cashier/history-orders', historyOrders);

export default router;
