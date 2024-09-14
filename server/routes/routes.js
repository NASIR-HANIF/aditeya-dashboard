import express from "express";
import multer from 'multer';
// Middleware for file handling
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });
import { getDataController, postDataController } from '../controllers/dataController.js';

const router = express.Router();

router.get('/api/message', getDataController); 

router.post('/api/message',upload.single('image'), postDataController); 

export default router;