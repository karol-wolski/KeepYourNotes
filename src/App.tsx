import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotesPage from './pages/Notes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NotesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
