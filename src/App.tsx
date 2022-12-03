import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import NotesPage from './pages/Notes'
import RegisterPage from './pages/Register'
import RemindPasswordPage from './pages/RemindPassword'
import ResetPasswordPage from './pages/ResetPassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NotesPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/remindPassword' element={<RemindPasswordPage />} />
        <Route path='/resetPassword' element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
