import { useLocation } from 'react-router-dom'
import ResetPasswordForm from '../components/resetPasswordForm/ResetPasswordForm'
import { asyncFetch } from '../helpers/asyncFetch'
import LayoutForm from '../layout/LayoutForm/LayoutForm'

const ResetPasswordPage = () => {
  const location = useLocation().search
  const token = new URLSearchParams(location).get('resetId')
  const handleOnSubmit = (password: string, cb: (msg: string) => void) => {
    asyncFetch('user/resetPassword', 'PATCH', { password: password, resetToken: token }).then(response => {
      if (response.message) cb(response.message)
    })
  }
  return (
    <LayoutForm title='Reset Password'>
      <ResetPasswordForm handleOnSubmit={handleOnSubmit} />
    </LayoutForm>
  )
}

export default ResetPasswordPage
