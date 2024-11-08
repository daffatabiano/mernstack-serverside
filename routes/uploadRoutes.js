import express from 'express';
import {
  deleteFile,
  getImage,
  uploadFiles,
} from '../controllers/uploadController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/api/v1/upload', uploadMiddleware, uploadFiles);

router.get('/api/v1/upload/:id', uploadMiddleware, getImage);

router.delete('/api/v1/files/:id', uploadMiddleware, deleteFile);

export default router;
