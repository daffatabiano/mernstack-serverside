import path from 'path';
import express from 'express';
import fs from 'fs';

export const uploadFiles = async (req, res) => {
  const file = req.files?.file;

  if (!file) {
    return res.status(400).json({ message: 'No file was uploaded.' });
  }

  const fileName = file.name;

  const filePath = path.join(process.cwd(), '../uploads', fileName);

  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to upload file.' });
    }

    return res.status(200).json({ message: 'File uploaded successfully.' });
  });
};

export const getImage = async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(process.cwd(), '../upload', fileName);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).json({ message: 'File not found' });
};

export const deleteFile = async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(process.cwd(), '../uploads', fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.status(200).json({ message: 'File deleted successfully' });
  }

  return res.status(404).json({ message: 'File not found' });
};
