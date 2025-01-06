import './App.css'
import Error from './pages/Error'
import Splash from './pages/Splash'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
     return (
     <>
      <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          {/* Error 404 Page */}
          <Route path='*' element={<Error />} />
      </Routes>
     </>
     )
}

export default App