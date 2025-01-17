import path from 'path';
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // if (!fs.existsSync('/uploads')) {
    //   fs.mkdirSync('/uploads');
    // }
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueName + extname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB,
  fileFilter,
});
