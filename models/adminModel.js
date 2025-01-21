import mongoose from 'mongoose';

const adminSchema = mongoose.Schema(
  {
    NIK: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    born_date: Date,
    gender: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('users', adminSchema);
