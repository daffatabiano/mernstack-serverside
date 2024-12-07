import express from 'express';
import midTransClient from 'midtrans-client';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productsController.js';

const router = express.Router();

let snap = new midTransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-xrqyBbFmyc1Oco4RkTstzmbj',
});

router.get('/api/v1/products', getProducts);
router.get('/api/v1/products/:id', getProductById);
router.post('/api/v1/product', createProduct);
router.put('/api/v1/product/:id', updateProduct);
router.delete('/api/v1/product/:id', deleteProduct);
router.post('/api/v1/midtrans', async (req, res) => {
  let { id, amount, firstName, lastName, email, phone } = req.body;

  if (!id || !amount) {
    return res
      .status(400)
      .json({ message: 'All required fields must be provided' });
  }

  try {
    const token = await snap.createTransactionToken({
      transaction_details: {
        order_id: id,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
      },
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
