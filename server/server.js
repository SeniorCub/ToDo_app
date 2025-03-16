import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/user.route.js'
import taskRouter from './src/routes/task.route.js'
import noteRouter from './src/routes/note.route.js'

const app = express()

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

const port = 3030
app.listen(port, () => {
     console.log(`
          Server is running.
          http://localhost:${port}
     `)
})