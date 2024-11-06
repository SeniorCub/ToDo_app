import db from '../database.js'
import bcrypt from 'bcrypt'

export const addUser = async (username, password, email) => {
     const salt = 10;
     const hash =  await bcrypt.hash(password, salt);
     try {
          const [result] = await db.query('INSERT INTO user_tb (username,password,email) VALUES (?,?,?)', [username, hash, email])
          return result
     } catch (error) {
          console.error(error.message);
     }
}
