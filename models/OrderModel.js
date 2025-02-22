import mongoose from 'mongoose';

const OrderModel = new mongoose.Schema({
  tableId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  orderData: {
    type: [Object],
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', OrderModel);
