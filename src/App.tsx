import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import NotesPage from './pages/Notes'
import RegisterPage from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NotesPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
