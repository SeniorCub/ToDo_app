import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/user.route.js'
import taskRouter from './src/routes/task.route.js'
import noteRouter from './src/routes/note.route.js'
import dotenv from 'dotenv'
import './src/cron.js'
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const corsOptions = {
     origin: 'http://localhost:5173', // Allow only example.com
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],      // Allow only specific HTTP methods
     allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
     credentials: true,              // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// routes
app.use('/api/user', userRouter)
app.use('/api/task', taskRouter)
app.use('/api/note', noteRouter)

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port http://localhost/${PORT}`));