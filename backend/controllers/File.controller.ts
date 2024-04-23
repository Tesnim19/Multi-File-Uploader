
import { Request, Response } from 'express';
import File from '../models/FileModel';
import upload from '../config/multer';
import multer from 'multer';

// Controller function to retrieve all files
export const getAllFiles = async (req: Request, res: Response) => {
    try {
        const files = await File.findAll();
        return res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to upload a new file
export const uploadFile = async (req: Request, res: Response) => {
  try {
    // Use Multer middleware to handle multiple file upload
    upload.array('files')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Multer error occurred
        return res.status(400).json({ error: 'File upload error: ' + err.message });
      } else if (err) {
        // Other error occurred
        console.error('File upload error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Extract description from request body
      const { description } = req.body;

      // Files uploaded successfully
      const uploadedFiles = req.files as Express.Multer.File[];
      const savedFiles = [];
      for (const file of uploadedFiles) {
        // Save file details and description to the database
        const { originalname, path } = file;
        const newFile = await File.create({ filename: originalname, filepath: path, description });
        savedFiles.push(newFile);
      }

      // Respond with success message and saved file details
      return res.status(200).json({ message: 'Files uploaded successfully', files: savedFiles });
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a file by ID
export const deleteFile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const file = await File.findByPk(id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    await file.destroy();
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const file = await File.findByPk(id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    file.description = description;
    await file.save();
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
