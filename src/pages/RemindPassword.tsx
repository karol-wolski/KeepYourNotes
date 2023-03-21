import { FormattedMessage } from 'react-intl'
import RemindPasswordForm from '../components/RemindPasswordForm/RemindPasswordForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'

const RemindPasswordPage = () => {
  return (
    <LayoutForm title={<FormattedMessage id='app.remindPassword' defaultMessage='Remiond password' />}>
      <RemindPasswordForm />
    </LayoutForm>
  )
}

export default RemindPasswordPage
