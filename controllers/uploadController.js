import path from 'path';
import fs from 'fs';
import File from '../models/uploadModel.js';

// Fungsi untuk mengunggah file
export const uploadFiles = async (req, res) => {
  const { file } = req;

  try {
    // Simpan informasi file ke database
    const fileData = new File({
      fileName: file.originalname,
      filePath: file.path,
      size: file.size,
      mimetype: file.mimetype,
    });

    const savedFile = await fileData.save();

    res.status(200).json({
      message: 'File uploaded successfully',
      file: savedFile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fungsi untuk mengambil file
export const getFile = async (req, res) => {
  try {
    const file = await File.findOne({ fileName: req.params.fileName });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const stream = fs.createReadStream(file.filePath);
    stream.on('error', (error) => {
      console.error(error);
      return res.status(500).json({ message: 'Error reading file' });
    });

    res.setHeader('Content-Type', file.mimetype);
    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fungsi untuk menghapus file
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne({ fileName: req.params.fileName });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    await File.deleteOne({ _id: file._id });

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
