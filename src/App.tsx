import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import LoaderPage from './components/loaderPage/LoaderPage'
import { AuthContext } from './context/AuthContext'
import { isAuthorized } from './helpers/isAuthorized'
import localeEn from './lang/en.json'
import localePl from './lang/pl.json'

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
const SettingsPage = lazy(() => import('./pages/Settings/Settings'))
const EditUserPage = lazy(() => import('./pages/EditUser/EditUser'))
const EditPasswordPage = lazy(() => import('./pages/EditPassword/EditPassword'))
const StatusPage = lazy(() => import('./pages/Status'))

function App() {
  const language = navigator.language.split(/[-_]/)[0]
  const getLanguageFromLS = localStorage.getItem('lang')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthorized())
  const [languageApp, setLanguageApp] = useState<string>(getLanguageFromLS || language)

  const changeAppLanguage = (language: string) => setLanguageApp(language)

  const messages = {
    en: localeEn,
    pl: localePl,
  }

  return (
    <IntlProvider messages={messages[languageApp as keyof typeof messages]} locale={languageApp} defaultLocale='en'>
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
                path='/profile/app'
                element={
                  <ProtectedRoute redirectPath='/login' isAllowed={isLoggedIn}>
                    <SettingsPage changeLanguage={changeAppLanguage} />
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
              <Route path='/status' element={<StatusPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContext.Provider>
    </IntlProvider>
  )
}

export default App
