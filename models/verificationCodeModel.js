import mongoose from 'mongoose';

const verficationCodeSchema = mongoose.Schema({
  phone: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: 600 }, // 10 minutes
  },
});

export default mongoose.model('VerificationCode', verficationCodeSchema);
