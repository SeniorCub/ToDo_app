import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config();

const connect = mysql.createPool({
     host: process.env.MYSQL_HOST,
     user: process.env.MYSQL_USER,
     password: process.env.MYSQL_PASSWORD,
     database: process.env.MYSQL_DATABASE,
     port: process.env.MYSQL_PORT || 3306,
     // socketPath: '/opt/lampp/var/mysql/mysql.sock'
}).promise()

connect.getConnection()
     .then(() => console.log("✅ Database connected successfully!"))
     .catch(err => console.error("❌ Database connection failed:", err.message));


if (connect) {
     console.log('Database connected');
} else {
     console.log('Database not connected');
     throw new Error('Database connection failed');
}

// const [users] = await connect.query('SELECT * FROM user_tb')
// const [tasks] = await connect.query('SELECT * FROM task_tb')
// const [notes] = await connect.query('SELECT * FROM note_tb')
// const [diarys] = await connect.query('SELECT * FROM diary_tb')

// console.log(users);
// console.log(tasks);
// console.log(notes);
// console.log(diarys);

export default connect