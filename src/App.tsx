import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { isAuthorized } from './helpers/isAuthorized'
import ActivationPage from './pages/Activation'
import LoginPage from './pages/Login'
import NotesPage from './pages/Notes'
import RegisterPage from './pages/Register'

interface IProtectedRoute {
  isAllowed: boolean
  redirectPath: string
  children: React.ReactElement
}

const ProtectedRoute = ({ isAllowed, redirectPath = '/login', children }: IProtectedRoute) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <LoginPage />
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthorized())

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute redirectPath='/login' isAllowed={isLoggedIn}>
                <NotesPage />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={!isLoggedIn ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/signup' element={!isLoggedIn ? <RegisterPage /> : <Navigate to='/' />} />
          <Route path='/activate-account' element={!isLoggedIn ? <ActivationPage /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
