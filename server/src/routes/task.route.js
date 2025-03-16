import express from "express";
import { createTask, fetchTask, completeTask, deleteTasks, pendingTask } from "../controller/task.controller.js";

const router = express.Router()

router.post('/create', createTask)
router.get('/alltasks/:user_id', fetchTask)
router.put('/complete/:task_id', completeTask)
router.put('/pending/:task_id', pendingTask)
router.delete('/delete/:task_id', deleteTasks)

export default router