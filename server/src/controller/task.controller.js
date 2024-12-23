import { addTask, getTask, isComplete, deleteTask, isPending } from "../model/task.model.js";

export const createTask = async (req, res) => {
     const {title, description, time, date, user_Id} = req.body
     try {
          const result = await addTask(title, description, time, date, user_Id)
          console.log(result)

          if(result.affectedRows === 0){
               res.status(402).json({message:'task not created'})
           } else {
               res.status(200).json({message:'task created successfully', task_Id:result.insertId, user_Id:user_Id})
           }
     } catch (error) {
          console.error(error.message);
     }
}

export const fetchTask = async (req, res) => {
     const {user_Id} = req.params
     try {
          const result = await getTask(user_Id)
          console.log(result)
          res.status(200).json({message:'task fetched successfully', result})
     } catch (error) {
          console.error(error.message);
     }
}

export const completeTask = async (req, res) => {
     const {task_Id} = req.params
     try {
          const result = await isComplete(task_Id)
          console.log(result)
          res.status(200).json({message:'task completed successfully', result})
     } catch (error) {
          console.error(error.message);
     }
}
export const pendingTask = async (req, res) => {
     const {task_Id} = req.params
     try {
          const result = await isPending(task_Id)
          console.log(result)
          res.status(200).json({message:'task is now pending', result})
     } catch (error) {
          console.error(error.message);
     }
}

export const deleteTasks = async (req, res) => {
     const {task_Id} = req.params
     try {
          const result = await deleteTask(task_Id)
          console.log(result)
          res.status(200).json({message:'task deleted successfully', result})
     } catch (error) {
          console.error(error.message);
     }
}