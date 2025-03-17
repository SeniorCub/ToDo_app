import db from '../config/database.js'

export const addNote = async (title, contet, user_id) => {
     try {
          const [result] = await db.query('INSERT INTO note_tb (title, contet, user_id) VALUES (?,?,?)', [title,contet,user_id])
          return result
     } catch (error) {
          console.error(error.message);
     }
}
export const correctNote = async (title, contet, user_id, id) => {
     try {
          const [result] = await db.query('UPDATE note_tb SET title = ?, contet = ? WHERE id = ? AND user_id = ?', [title, contet, id, user_id])
          return result
     } catch (error) {
          console.error(error.message);
     }
}

export const getallNotes = async (user_id) => {
     try {
          const [result] = await db.query('SELECT * FROM note_tb WHERE user_id = ? ORDER BY created_at DESC', [user_id])
          return result
     } catch (error) {
          console.error(error.message);
     }
}

export const getNote = async (id) => {
     try {
          const [result] = await db.query('SELECT * FROM note_tb WHERE id = ?', [id])
          return result
     } catch (error) {
          console.error(error.message);
     }
}

export const removeNote = async (id) => {
     try {
          const [result] = await db.query('DELETE FROM note_tb WHERE id = ?',[id])
          return result
     } catch (error) {
          console.error(error.message)
     }
}

export const addFav = async (id) => {
     try {
          const [result] = await db.query('UPDATE note_tb SET favorite = 1 WHERE id = ?', [id])
          return result
     } catch (error) {
          console.error(error.message)
     }
}