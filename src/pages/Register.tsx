import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/registerForm/RegisterForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'

const RegisterPage = () => {
  const { formatMessage } = useIntl()

  return (
    <LayoutForm title={formatMessage({ id: 'app.signUp', defaultMessage: 'Sign up' })}>
      <RegisterForm />
      <p className='pt-4 text-center'>
        <FormattedMessage
          id='app.goToPage'
          values={{
            page: <Link to='/'>{formatMessage({ id: 'app.login', defaultMessage: 'Login' })}</Link>,
          }}
        />
      </p>
    </LayoutForm>
  )
}

export default RegisterPage
