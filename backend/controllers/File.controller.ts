
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
    // Use Multer middleware to handle multiple file uploads
    upload.array('files[]')(req, res, async (err: any) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Files uploaded successfully
      const uploadedFiles = req.files as Express.Multer.File[];
      const fileData: any[] = [];

      // Extract file data and descriptions
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const description = req.body[`description${i}`];
        fileData.push({ filename: file.originalname, filepath: file.path, description });
      }

      // Save file details to the database
      const savedFiles = await File.bulkCreate(fileData);

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
