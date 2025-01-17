import fs from 'fs';
import File from '../models/uploadModel.js';
import path from 'path';

// Fungsi untuk mengunggah file
export const uploadFiles = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Buat URL gambar
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      file.filename
    }`;

    res.status(201).json({
      message: 'File uploaded successfully',
      imageUrl,
    });
  } catch (err) {
    console.log('ERROR: ', err);
  }
  // console.log(req.file);
  // if (req.file === null)
  //   return res.status(400).json({ msg: 'No File Uploaded' });
  // const fileSize = file.data.length;
  // const ext = path.extname(file.name);
  // const fileName = file.md5 + ext;
  // const url = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
  // const allowedType = ['.png', '.jpg', '.jpeg'];

  // if (!allowedType.includes(ext.toLowerCase()))
  //   return res.status(422).json({ msg: 'Invalid Images' });
  // if (fileSize > 5000000)
  //   return res.status(422).json({ msg: 'Image must be less than 5 MB' });

  // file.mv(`./uploads/${fileName}`, async (err) => {
  //   if (err) return res.status(500).json({ msg: err.message });
  //   try {
  //     res.status(201).json({ msg: 'Product Created Successfuly', url });
  //   } catch (error) {
  //     console.log('ERROR:', error.message);
  //   }
  // });
};

// Fungsi untuk mengambil file
export const getFile = async (req, res) => {
  try {
    const file = await File.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const stream = fs.createReadStream(file.path);
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
