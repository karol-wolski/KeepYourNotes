import RemindPasswordForm from '../components/RemindPasswordForm/RemindPasswordForm'

const RemindPasswordPage = () => {
  const handleOnSubmit = (email: string) => {
    console.log(email)
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='row w-50'>
        <h2>Remind Password</h2>
        <RemindPasswordForm handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  )
}

export default RemindPasswordPage
