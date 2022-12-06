import { useContext } from 'react'
import LoginForm from '../components/loginForm/LoginForm'
import { AuthContext, IAuthContext } from '../context/AuthContext'
import { asyncFetch } from '../helpers/asyncFetch'
import { addToLocalStorage } from '../helpers/localStorage'
import { AuthContext, IAuthContext } from '../context/AuthContext'
import { asyncFetch } from '../helpers/asyncFetch'
import { addToLocalStorage } from '../helpers/localStorage'

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext) as IAuthContext
  const handleOnSubmit = async (email: string, password: string, cb: (param: any) => void) => {
    asyncFetch('auth/login', 'POST', { email: email, password: password }).then(response => {
      if (response.token) {
        addToLocalStorage('token', response.token)
        setIsLoggedIn((state: boolean) => !state)
      } else {
        cb({ form: response.message })
      }
    })
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='row w-50'>
        <h2>Login</h2>
        <LoginForm handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  )
}

export default LoginPage
