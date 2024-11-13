import './App.css'
import ListView from "./pages/ListView"
import CalenderView from "./pages/CalenderView"
import Error from './pages/Error'
import { Routes, Route } from 'react-router-dom'

function App() {
     return (
     <>
      <Routes>

          <Route path='/' element={<ListView />} />
          <Route path='/CalenderView' element={<CalenderView />} />
          {/* Error 404 Page */}
          <Route path='*' element={<Error />} />
      </Routes>
     </>
     )
}

export default App
