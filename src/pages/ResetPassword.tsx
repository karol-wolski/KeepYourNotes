import ResetPasswordForm from '../components/resetPasswordForm/ResetPasswordForm'

const ResetPasswordPage = () => {
  const handleOnSubmit = (password: string) => {
    console.log(password)
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
