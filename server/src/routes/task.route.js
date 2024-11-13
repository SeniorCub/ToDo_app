import express from "express";
import { createTask, fetchTask, completeTask, deleteTasks, pendingTask } from "../controller/task.controller.js";

const router = express.Router()

router.post('/create', createTask)
router.get('/fetch/:user_Id', fetchTask)
router.put('/complete/:task_Id', completeTask)
router.put('/pending/:task_Id', pendingTask)
router.delete('/delete/:task_Id', deleteTasks)

export default router