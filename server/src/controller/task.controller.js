import { addTask, getTask, isComplete, deleteTask, isPending } from "../model/task.model.js";

export const createTask = async (req, res) => {
     const {title, description, time, date, user_id} = req.body
     if (!title || !description || !time || !date || !user_id) {
          res.status(400).json({message:'all fields are required'})
     }
     try {
          const result = await addTask(title, description, time, date, user_id)

          if(result.affectedRows === 0){
               res.status(402).json({message:'task not created'})
           } else {
               res.status(200).json({
                    message:'task created successfully', 
                    task_Id:result.insertId, 
                    user_id: parseInt(user_id) 
               })
           }
     } catch (error) {
          console.error(error.message);
     }
}

export const fetchTask = async (req, res) => {
     const {user_id} = req.params
     if (!user_id) {
          res.status(400).json({message:'user_id is required'})
     }
     try {
          const result = await getTask(user_id)
          res.status(200).json({
               message:'task fetched successfully', 
               data: result
          })
     } catch (error) {
          console.error(error.message);
     }
}

export const completeTask = async (req, res) => {
     const {task_Id} = req.params
     try {
          const result = await isComplete(task_Id)
          res.status(200).json({message:'task completed successfully', result})
     } catch (error) {
          console.error(error.message);
     }
}
export const pendingTask = async (req, res) => {
     const {task_Id} = req.params
     try {
          const result = await isPending(task_Id)
          res.status(200).json({message:'task is now pending', result})
     } catch (error) {
          console.error(error.message);
     }
}

export const deleteTasks = async (req, res) => {
     const {task_Id} = req.params
     try {
          const result = await deleteTask(task_Id)
          res.status(200).json({message:'task deleted successfully', result})
     } catch (error) {
          console.error(error.message);
     }
}