import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import LoginForm from '../components/loginForm/LoginForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'
import styles from './Login.module.scss'

const LoginPage = () => {
  return (
    <LayoutForm title={<FormattedMessage id='app.login' defaultMessage='Login' />}>
      <LoginForm />

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
