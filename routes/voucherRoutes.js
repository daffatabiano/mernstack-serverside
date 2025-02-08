import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import {
  createVoucher,
  deleteAllVouchers,
  deleteVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
} from '../controllers/voucherController.js';
import { adminPermission } from '../middlewares/adminPermission.js';

const router = express.Router();

router.post(
  '/api/v1/create-voucher',
  verifyToken,
  adminPermission,
  createVoucher
);
router.get('/api/v1/vouchers', verifyToken, getAllVouchers);
router.get('/api/v1/voucher/:id', verifyToken, getVoucherById);
router.put('/api/v1/update-voucher/:id', verifyToken, updateVoucher);
router.delete(
  '/api/v1/delete-voucher/:id',
  verifyToken,
  adminPermission,
  deleteVoucher
);
router.delete(
  '/api/v1/delete-all-vouchers',
  verifyToken,
  adminPermission,
  deleteAllVouchers
);

export default router;
