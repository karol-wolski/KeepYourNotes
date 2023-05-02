import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/registerForm/RegisterForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'
import useFetch from '../hooks/useFetch'

interface IResponse {
  [id: string]: string
}

const RegisterPage = () => {
  const { errors, successMsg, clearSuccessMsg, isLoading, fetchData, statusCode } = useFetch<IResponse>()
  const { formatMessage } = useIntl()

  const onSubmit = (username: string, email: string, password: string) => {
    fetchData('auth/register', 'POST', { username: username, email: email, password: password })
  }

  return (
    <LayoutForm title={formatMessage({ id: 'app.signUp', defaultMessage: 'Sign up' })}>
      <RegisterForm
        onSubmit={onSubmit}
        errors={errors}
        isLoading={isLoading}
        clearSuccessMsg={clearSuccessMsg}
        statusCode={statusCode}
        successMsg={successMsg}
      />
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
