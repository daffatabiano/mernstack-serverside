import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import otpRoutes from './routes/otpRoutes.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(
  cors()
  //   {
  //   origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
  //   credentials: true,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(otpRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
