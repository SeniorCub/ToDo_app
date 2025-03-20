import './App.css'
import Error from './view/Error'
import Splash from './pages/Splash'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoutes'
import ListView from './pages/tasks/ListView'
import MainLayout from './layout/MainLayout'
import NoteView from './pages/notes/NoteView'
import CalenderView from './pages/tasks/CalenderView'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <Toaster position="top-center" />

            <Routes>
                <Route path='/' element={<Splash />} />
                <Route path='/sign' element={<Register />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <MainLayout child={<ListView />} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>
                            <MainLayout child={<NoteView />} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/calender"
                    element={
                        <ProtectedRoute>
                            <MainLayout child={<CalenderView />} />
                        </ProtectedRoute>
                    }
                />

                {/* Error 404 Page */}
                <Route path='*' element={<Error />} />
            </Routes>
        </>
    )
}

export default App