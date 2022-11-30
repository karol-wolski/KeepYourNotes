import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from '../components/registerForm/RegisterForm'

const RegisterPage = () => {
  const navigate = useNavigate()
  const handleOnSubmit = (username: string, email: string, password: string) => {
    console.log(username, email, password)

    navigate('/')
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='row w-50'>
        <h2>Sign up</h2>
        <RegisterForm handleOnSubmit={handleOnSubmit} />

        <p className='pt-4 text-center'>
          Go to <Link to='/login'>Login page</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
