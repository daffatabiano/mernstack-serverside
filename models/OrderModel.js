import mongoose from 'mongoose';

const OrderModel = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  data: {
    type: [Object],
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
  },
});

export default mongoose.model('Order', OrderModel);
