import { FormattedMessage } from 'react-intl'
import ResetPasswordForm from '../components/resetPasswordForm/ResetPasswordForm'
import LayoutForm from '../layout/LayoutForm/LayoutForm'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface IResponse {
  token: string
}

const ResetPasswordPage = () => {
  const { errors, successMsg, isLoading, fetchData, statusCode } = useFetch<IResponse>()
  const navigate = useNavigate()

  const onSubmit = (password: string, token: string) => {
    fetchData('user/resetPassword', 'PATCH', { password: password, resetToken: token })
  }

  useEffect(() => {
    if (statusCode === 200) navigate('/success', { state: { defaultMessage: successMsg, tranlateId: 'app' } })
  }, [statusCode, successMsg])

  return (
    <LayoutForm title={<FormattedMessage id='app.resetPassword' defaultMessage='Reset your password' />}>
      <ResetPasswordForm onSubmit={onSubmit} errors={errors} isLoading={isLoading} />
    </LayoutForm>
  )
}

export default ResetPasswordPage
