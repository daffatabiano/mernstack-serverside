import path from 'path';
import fs from 'fs';

export const uploadFiles = async (req, res) => {
  const { file } = req;
  try {
    const fileData = new File({
      fileName: file.originalname,
      filePath: file.path,
      size: file.size,
      mimetype: file.mimetype,
    });

    const savedFile = await fileData.save();
    res
      .status(200)
      .json({ message: 'File uploaded successfully', file: savedFile });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await File.find({ fileName: req.params.fileName });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.setHeader('Content-Type', file.mimetype);
    res.send(fs.createReadStream(file.filePath));
    res.status(200).json({ message: 'File fetched successfully', file });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
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
