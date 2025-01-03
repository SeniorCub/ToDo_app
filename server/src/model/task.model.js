import db from '../database.js'

export const addTask = async (title, description, time, date, user_Id) => {
     try {
          const [result] = await db.query('INSERT INTO task_tb (isPending, isComplete, title, description, time, date, user_id) VALUES (0,0,?,?,?,?,?)',[title, description, time, date, user_Id])
          return result
     } catch (error) {
          console.error(error.message);
     }
}

export const getTask = async (user_Id) => {
     try {
          const [result] = await db.query('SELECT * FROM task_tb WHERE user_id = ?',[user_Id])
          return result
     } catch (error) {
          console.error(error.message);
     }
}

export const isComplete = async (task_Id) => {
     try {
          const [result] = await db.query('UPDATE task_tb SET isComplete = 1 WHERE id = ?',[task_Id])
          return result
     } catch (error) {
          console.error(error.message);
     }
}

export const isPending = async (task_Id) => {
     try {
          const [result] = await db.query('UPDATE task_tb SET isPending = 1 WHERE id = ?',[task_Id])
          return result
     } catch (error) {
          console.error(error.message);
     }
}

export const deleteTask = async (task_Id) => {
     try {
          const [result] = await db.query('DELETE FROM task_tb WHERE id = ?',[task_Id])
          return result
     } catch (error) {
          console.error(error.message);
     }
}