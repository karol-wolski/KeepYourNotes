import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import LoginForm from '../components/loginForm/LoginForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'
import styles from './Login.module.scss'
import useFetch from '../hooks/useFetch'
import { useContext, useEffect } from 'react'
import { addToLocalStorage } from '../helpers/localStorage'
import { AuthContext, IAuthContext } from '../context/AuthContext'

interface IResponse {
  token: string
}

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext) as IAuthContext
  const { data, errors, isLoading, fetchData, statusCode } = useFetch<IResponse>()

  useEffect(() => {
    if (statusCode === 200 && data) {
      addToLocalStorage('token', data.token)
      setIsLoggedIn((state: boolean) => !state)
    }
  }, [statusCode, data])

  const onSubmit = (email: string, password: string) => {
    fetchData('auth/login', 'POST', { email: email, password: password })
  }

  return (
    <LayoutForm title={<FormattedMessage id='app.login' defaultMessage='Login' />}>
      <LoginForm onSubmit={onSubmit} errors={errors} isLoading={isLoading} statusCode={statusCode} />

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
