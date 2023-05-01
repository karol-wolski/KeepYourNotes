import { FormattedMessage } from 'react-intl'
import ResetPasswordForm from '../components/resetPasswordForm/ResetPasswordForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'
import useFetch from '../hooks/useFetch'

interface IResponse {
  token: string
}

const ResetPasswordPage = () => {
  const { errors, successMsg, clearSuccessMsg, isLoading, fetchData, statusCode } = useFetch<IResponse>()

  const onSubmit = (password: string, token: string) => {
    fetchData('user/resetPassword', 'PATCH', { password: password, resetToken: token })
  }

  return (
    <LayoutForm title={<FormattedMessage id='app.resetPassword' defaultMessage='Reset your password' />}>
      <ResetPasswordForm
        onSubmit={onSubmit}
        errors={errors}
        isLoading={isLoading}
        clearSuccessMsg={clearSuccessMsg}
        statusCode={statusCode}
        successMsg={successMsg}
      />
    </LayoutForm>
  )
}

export default ResetPasswordPage
