
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

import fs from 'fs/promises';

export const updateFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, files } = req.body;
  // const files = req.files as Express.Multer.File[];

  try {
    let updatedFile = await File.findByPk(id);
    if (!updatedFile) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Handle both cases where description and/or file may be updated
    const fileData: any[] = [];
    const existingDescription = updatedFile.description;

    // Add the new file to fileData if provided
    if (files.length > 0) {
      const newFile = files[0];
      const newPath = 'path/to/new/file'; // Path where the new file will be saved
      await fs.writeFile(newPath, newFile.buffer); // Write the new file to the server
      fileData.push({ filename: newFile.originalname, filepath: newPath });
    }

    // Use existing description if description is not provided
    const updatedDescription = description ? description : existingDescription;

    // Update the file details in the database
    await updatedFile.update({ description: updatedDescription });

    // Save the new file details to the database if a new file is provided
    if (fileData.length > 0) {
      await File.bulkCreate(fileData);
    }

    // Respond with the updated file
    return res.status(200).json(updatedFile);
  } catch (error) {
    console.error('Error updating file:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};