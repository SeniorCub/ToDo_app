import express from "express";
import { createNote, deleteNote, fetchallNotes, fetchNote, editNote, favNote } from "../controllers/note.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post('/create', protect, createNote)
router.get('/allnotes/:user_id', protect, fetchallNotes)
router.get('/note/:id', protect, fetchNote)
router.delete('/delete/:id', protect, deleteNote)
router.put('/edit/:id', protect, editNote)
router.put('/fav/:id', protect, favNote)


export default router