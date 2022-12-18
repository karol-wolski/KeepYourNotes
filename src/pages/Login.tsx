import { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/loginForm/LoginForm'
import { AuthContext, IAuthContext } from '../context/AuthContext'
import { asyncFetch } from '../helpers/asyncFetch'
import { addToLocalStorage } from '../helpers/localStorage'

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext) as IAuthContext
  const handleOnSubmit = async (
    email: string,
    password: string,
    cb: React.Dispatch<React.SetStateAction<{ form: string }>>,
  ) => {
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

        <Link to='/remindPassword'>Reset your password</Link>
        <p className='pt-4 text-center'>
          Go to <Link to='/signup'>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
