import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createDiary, deleteDiary, getDiaries } from "../controllers/diary.controller.js";
import multer from "multer";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name correctly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
     fs.mkdirSync(uploadsDir, { recursive: true });
}

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, uploadsDir);
     },
     filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const extension = file.mimetype.split('/')[1] || 'webm';
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
     }
});

const upload = multer({
     storage: storage,
     fileFilter: (req, file, cb) => {
          cb(null, true);
     }
});

// Routes
router.post("/create", protect, upload.single('audioFile'), createDiary);
router.get("/all/:user_id", protect, getDiaries);
router.delete("/delete/:id", protect, deleteDiary);

export default router;