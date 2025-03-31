import express from "express";
import { createTask, fetchTask, completeTask, deleteTasks, fetchAtask, editTask } from "../controllers/task.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post('/create', protect, createTask)
router.get('/alltasks/:user_id', protect, fetchTask)
router.get('/task/:id', protect, fetchAtask)
router.put('/complete/:id', protect, completeTask)
router.delete('/delete/:id', protect, deleteTasks)
router.put('/edit/:id', protect, editTask)

export default router