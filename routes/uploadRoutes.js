import express from 'express';
import { upload } from '../middlewares/storage.js';
import { getFile, uploadFiles } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/api/v1/upload', upload.single('file'), uploadFiles);
router.get('/api/v1/download/:id', getFile);

export default router;
