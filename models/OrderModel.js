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
    type: Boolean,
    required: true,
    default: true,
  },
});

export default mongoose.model('Order', OrderModel);
