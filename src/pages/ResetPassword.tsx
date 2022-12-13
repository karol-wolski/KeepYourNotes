import { useLocation } from 'react-router-dom'
import ResetPasswordForm from '../components/resetPasswordForm/ResetPasswordForm'
import { asyncFetch } from '../helpers/asyncFetch'

const ResetPasswordPage = () => {
  const location = useLocation().search
  const token = new URLSearchParams(location).get('resetId')
  const handleOnSubmit = (password: string, cb: (msg: string) => void) => {
    asyncFetch('user/resetPassword', 'PATCH', { password: password, resetToken: token }).then(response => {
      if (response.message) cb(response.message)
    })
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='row w-50'>
        <h2>Reset Password</h2>
        <ResetPasswordForm handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  )
}

export default ResetPasswordPage
