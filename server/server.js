import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/user.route.js';
import taskRouter from './src/routes/task.route.js';
import noteRouter from './src/routes/note.route.js';
import dotenv from 'dotenv';
import './src/cron.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
     origin: 'http://localhost:5173',
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true,
};
app.use(cors(corsOptions));

// Serve API documentation page
app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'src', 'view', 'index.html'));
});


// Routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/note', noteRouter);

// Catch-all route for errors
app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'src', 'view', 'error.html'));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
