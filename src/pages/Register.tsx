import { Link } from 'react-router-dom'
import RegisterForm from '../components/registerForm/RegisterForm'
import { asyncFetch } from '../helpers/asyncFetch'

const RegisterPage = () => {
  const handleOnSubmit = (
    username: string,
    email: string,
    password: string,
    cbError: React.Dispatch<React.SetStateAction<{ form: string }>>,
    cbSuccess: (msg: string) => void,
  ) => {
    asyncFetch('auth/register', 'POST', { username: username, email: email, password: password }).then(response => {
      if (response.message) {
        cbSuccess(response.message)
      } else {
        cbError({ form: response.errors[0].msg })
      }
    })
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
