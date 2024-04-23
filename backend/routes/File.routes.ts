import express, { Request, Response } from 'express';
import File from '../models/FileModel'; 
import { getAllFiles, uploadFile, deleteFile, updateFile } from '../controllers/File.controller';
const router = express.Router();

router.get('/files', getAllFiles);
router.post('/files',uploadFile);
router.delete('/files/:id', deleteFile);
router.put('/files/:id', updateFile);

export default router;
