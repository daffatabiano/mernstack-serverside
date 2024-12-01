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
  let parameter = {
    transaction_details: {
      order_id: req.body.id,
      gross_amount: req.body.amount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: req.body?.name?.split(' ')[0],
      last_name: req.body.name?.split(' ')[1],
      email: req.body.email,
      phone: req.body.phone,
    },
    item_details: [
      {
        id: req.body.id,
        price: req.body.pricePerItem,
        quantity: req.body.quantity,
        name: req.body.stuffName,
        category: req.body.category,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  };
  console.log(parameter);
  const token = await snap.createTransactionToken(parameter);
  res.status(200).json({ token });
});

export default router;
