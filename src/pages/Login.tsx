import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/loginForm/LoginForm'

const LoginPage = () => {
  const navigate = useNavigate()
  const handleOnSubmit = (email: string, password: string) => {
    console.log(email, password)

    navigate('/')
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
