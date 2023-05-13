import { useState } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import styles from '../../styles/buttons.module.scss'
import { FormattedMessage, useIntl } from 'react-intl'
import { useLocation } from 'react-router-dom'
import useObject from '../../hooks/useObject'

interface IResetPassword {
  password: string
  confirmPassword: string
}

type FieldError = { translateId: string; errorMsg: string } | undefined
interface IResetPasswordErrors {
  password: FieldError
  confirmPassword: FieldError
}

interface IResetPasswordForm {
  isLoading?: boolean
  errors?: string
  onSubmit: (password: string, token: string) => void
}

const ResetPasswordForm = ({ onSubmit, errors, isLoading }: IResetPasswordForm) => {
  const { formatMessage } = useIntl()
  const [form, setForm] = useState<IResetPassword>({
    password: '',
    confirmPassword: '',
  })

  const [errorsForm, setErrors] = useObject<IResetPasswordErrors>({
    password: undefined,
    confirmPassword: undefined,
  })

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const isPasswordValidate = formValidation.isPasswordValidate(form.password)
  const isConfirmPasswordValidate = formValidation.isConfirmPasswordValidate(form.password, form.confirmPassword)

  const location = useLocation().search
  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    const { password } = form
    const token = new URLSearchParams(location).get('resetId') || ''
    if (isPasswordValidate.isValidate && isConfirmPasswordValidate.isValidate) {
      onSubmit(password, token)
    } else {
      setErrors({
        ...errorsForm,
        password: isPasswordValidate.error,
        confirmPassword: isConfirmPasswordValidate.error,
      })
    }
  }

  const isVisibleSendButton = !!form.password.length && !!form.confirmPassword.length

  return (
    <form onSubmit={sendData}>
      <div className='mb-3'>
        <LabelInput
          id='password'
          type='password'
          labelText={<FormattedMessage id='app.password' defaultMessage='Password ' />}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errorsForm.password && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({
              id: errorsForm.password.translateId,
              defaultMessage: errorsForm.password.errorMsg,
            })}
          />
        )}
      </div>
      <div className='mb-3'>
        <LabelInput
          id='confirmPassword'
          type='password'
          labelText={<FormattedMessage id='app.passwordConfirm' defaultMessage='Confirm password' />}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errorsForm.confirmPassword && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({
              id: errorsForm.confirmPassword.translateId,
              defaultMessage: errorsForm.confirmPassword.errorMsg,
            })}
          />
        )}
      </div>
      {errors && <Alert type={ALERT_TYPE.DANGER} text={errors} />}

      <button type='submit' className={`btn btn-primary ${styles.btn__primary}`} disabled={!isVisibleSendButton}>
        {isLoading
          ? formatMessage({ id: 'app.submitting', defaultMessage: 'Submitting...' })
          : formatMessage({ id: 'app.submit', defaultMessage: 'Submit' })}
      </button>
    </form>
  )
}

export default ResetPasswordForm
