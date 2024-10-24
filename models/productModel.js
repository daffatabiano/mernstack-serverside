import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
