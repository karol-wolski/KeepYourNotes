import { FormattedMessage } from 'react-intl'
import RemindPasswordForm from '../components/RemindPasswordForm/RemindPasswordForm'
import { STATUS } from '../constants/constants'
import { asyncFetch } from '../helpers/asyncFetch'
import LayoutForm from '../layout/LayoutForm/LayoutForm'

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
    <LayoutForm title={<FormattedMessage id='app.remindPassword' defaultMessage='Remiond password' />}>
      <RemindPasswordForm handleOnSubmit={handleOnSubmit} />
    </LayoutForm>
  )
}

export default RemindPasswordPage
