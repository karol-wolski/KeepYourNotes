import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import LoginForm from '../components/loginForm/LoginForm'
import { AuthContext, IAuthContext } from '../context/AuthContext'
import { asyncFetch } from '../helpers/asyncFetch'
import { addToLocalStorage } from '../helpers/localStorage'
import LayoutForm from '../layout/LayoutForm/LayoutForm'
import styles from './Login.module.scss'

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
    <LayoutForm title='Login'>
      <LoginForm handleOnSubmit={handleOnSubmit} />

      <div className='d-flex justify-content-between align-items-center mt-2'>
        <Link to='/remind-password' className={`${styles.link} ${styles['link__reset']}`}>
          <FormattedMessage id='app.resetPassword' defaultMessage='Reset your password ' />
        </Link>
        <Link to='/signup' className={`${styles.link} ${styles['link__sign-up']}`}>
          <FormattedMessage id='app.signUp' defaultMessage='Sign up' />
        </Link>
      </div>
    </LayoutForm>
  )
}

export default LoginPage
