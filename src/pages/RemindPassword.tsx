import RemindPasswordForm from '../components/RemindPasswordForm/RemindPasswordForm'
import { STATUS } from '../constants/constants'
import { asyncFetch } from '../helpers/asyncFetch'

const RemindPasswordPage = () => {
  const handleOnSubmit = async (email: string, cb: (status: string, msg: string) => void) => {
    asyncFetch('user/forgotPassword', 'PATCH', { email: email }).then(response => {
      if (response.errors) {
        cb(STATUS.ERROR, response.message)
      } else {
        cb(STATUS.SUCCESS, response.message)
      }
    })
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
