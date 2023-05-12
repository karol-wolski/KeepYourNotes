import { FormattedMessage } from 'react-intl'
import LayoutForm from '../layout/LayoutForm/LayoutForm'
import { Link, useLocation } from 'react-router-dom'

const StatusPage = () => {
  const location = useLocation()
  const { defaultMessage, tranlateId } = location.state
  return (
    <LayoutForm title={<FormattedMessage id='app.success' defaultMessage='Success' />}>
      <FormattedMessage id={tranlateId} defaultMessage={defaultMessage} />
      <p className='pt-4 text-center'>
        <FormattedMessage
          id='app.goToPage'
          values={{
            page: (
              <Link to='/'>
                <FormattedMessage id='app.login' defaultMessage='Login' />
              </Link>
            ),
          }}
        />
      </p>
    </LayoutForm>
  )
}

export default StatusPage
