import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
