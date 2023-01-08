import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoaderPage from './components/loaderPage/LoaderPage'
import { AuthContext } from './context/AuthContext'
import { isAuthorized } from './helpers/isAuthorized'

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

const LoginPage = lazy(() => import('./pages/Login'))
const NotesPage = lazy(() => import('./pages/Notes'))
const RegisterPage = lazy(() => import('./pages/Register'))
const ActivationPage = lazy(() => import('./pages/Activation'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPassword'))
const RemindPasswordPage = lazy(() => import('./pages/RemindPassword'))
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFound'))
const EditUserPage = lazy(() => import('./pages/EditUser/EditUser'))
const EditPasswordPage = lazy(() => import('./pages/EditPassword/EditPassword'))

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthorized())

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <Suspense fallback={<LoaderPage />}>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute redirectPath='/login' isAllowed={isLoggedIn}>
                  <NotesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/login'
              element={
                <ProtectedRoute redirectPath='/' isAllowed={!isLoggedIn}>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <ProtectedRoute redirectPath='/' isAllowed={!isLoggedIn}>
                  <RegisterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/activate-account'
              element={
                <ProtectedRoute redirectPath='/' isAllowed={!isLoggedIn}>
                  <ActivationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/remind-password'
              element={
                <ProtectedRoute redirectPath='/' isAllowed={!isLoggedIn}>
                  <RemindPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute redirectPath='/' isAllowed={!isLoggedIn}>
                  <ResetPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/edit'
              element={
                <ProtectedRoute redirectPath='/login' isAllowed={isLoggedIn}>
                  <EditUserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/password'
              element={
                <ProtectedRoute redirectPath='/login' isAllowed={isLoggedIn}>
                  <EditPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
