import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
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

const OrderSchema = new mongoose.Schema(
  {
    tableId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderData: {
      type: [OrderItemSchema], // Menggunakan sub-schema untuk order items
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true } // Otomatis menambahkan createdAt & updatedAt
);

export default mongoose.model('Order', OrderSchema);
