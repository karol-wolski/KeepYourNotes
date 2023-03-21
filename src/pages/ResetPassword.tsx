import { FormattedMessage } from 'react-intl'
import ResetPasswordForm from '../components/resetPasswordForm/ResetPasswordForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'

const ResetPasswordPage = () => {
  return (
    <LayoutForm title={<FormattedMessage id='app.resetPassword' defaultMessage='Reset your password' />}>
      <ResetPasswordForm />
    </LayoutForm>
  )
}

export default ResetPasswordPage
