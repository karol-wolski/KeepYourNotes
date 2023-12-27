import { FormattedMessage } from 'react-intl'
import RemindPasswordForm from '../components/RemindPasswordForm/RemindPasswordForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface IResponse {
  message: string
}

const RemindPasswordPage = () => {
  const { errors, successMsg, isLoading, fetchData, statusCode } = useFetch<IResponse>()
  const navigate = useNavigate()
  const onSubmit = (email: string) => {
    fetchData('user/forgotPassword', 'PATCH', { email: email, page: 'NOTES' })
  }

  useEffect(() => {
    if (statusCode === 200) navigate('/status', { state: { defaultMessage: successMsg, tranlateId: 'app' } })
  }, [statusCode, successMsg])

  return (
    <LayoutForm title={<FormattedMessage id='app.remindPassword' defaultMessage='Remiond password' />}>
      <RemindPasswordForm onSubmit={onSubmit} errors={errors} isLoading={isLoading} />
    </LayoutForm>
  )
}

export default RemindPasswordPage
