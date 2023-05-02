import { FormattedMessage } from 'react-intl'
import RemindPasswordForm from '../components/RemindPasswordForm/RemindPasswordForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'
import useFetch from '../hooks/useFetch'

interface IResponse {
  message: string
}

const RemindPasswordPage = () => {
  const { errors, successMsg, clearSuccessMsg, isLoading, fetchData, statusCode } = useFetch<IResponse>()

  const onSubmit = (email: string) => {
    fetchData('user/forgotPassword', 'PATCH', { email: email })
  }

  return (
    <LayoutForm title={<FormattedMessage id='app.remindPassword' defaultMessage='Remiond password' />}>
      <RemindPasswordForm
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

export default RemindPasswordPage
