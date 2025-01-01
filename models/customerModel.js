import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  otp: {
    type: String,
  },
  voucher: {
    type: Array,
  },
  order: {
    type: Array,
  },
  role: {
    type: String,
  },
});

export default mongoose.model('Customer', customerSchema);
