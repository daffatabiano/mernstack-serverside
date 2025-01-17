import express from 'express';
import { upload } from '../middlewares/storage.js';
import path from 'path';
import { getFile, uploadFiles } from '../controllers/uploadController.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import File from '../models/uploadModel.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const router = express.Router();

router.post('/api/v1/upload', upload.single('file'), uploadFiles);

export default router;
