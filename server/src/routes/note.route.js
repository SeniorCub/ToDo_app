import express from "express";
import { createNote, deleteNote, fetchallNotes, fetchNote, editNote, favNote } from "../controller/note.controller.js";


const router = express.Router();

router.post('/create', createNote)
router.get('/allnotes/:user_id', fetchallNotes)
router.get('/note/:id', fetchNote)
router.delete('/delete/:id', deleteNote)
router.put('/edit/:id', editNote)
router.put('/fav/:id', favNote)


export default router