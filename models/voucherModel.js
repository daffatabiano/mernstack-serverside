import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  discount: {
    type: Number,
  },
  image: {
    type: String,
  },
  expires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Voucher', voucherSchema);
