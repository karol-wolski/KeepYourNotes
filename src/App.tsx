import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import NotesPage from './pages/Notes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NotesPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
