import express from 'express';
import {
  getAllCustomers,
  getCustomerProfile,
  updateCustomerProfile,
} from '../controllers/customerController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/api/v1/customers', verifyToken, getAllCustomers);
router.get('/api/v1/customer-profile/:id', verifyToken, getCustomerProfile);
router.put('/api/v1/update-customer/:id', verifyToken, updateCustomerProfile);

export default router;
