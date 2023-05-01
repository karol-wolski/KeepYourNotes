import { useState, useEffect } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import styles from '../../styles/buttons.module.scss'
import { FormattedMessage, useIntl } from 'react-intl'
import useObject from '../../hooks/useObject'

interface IRemindPassword {
  email: string
}

type FieldError = { translateId: string; errorMsg: string } | undefined
interface IRemindPasswordErrors {
  email: FieldError
}

interface IRemindPasswordForm {
  isLoading?: boolean
  errors?: string
  statusCode?: number
  successMsg?: string
  clearSuccessMsg: () => void
  onSubmit: (email: string) => void
}

const RemindPasswordForm = ({
  onSubmit,
  errors,
  isLoading,
  statusCode,
  clearSuccessMsg,
  successMsg,
}: IRemindPasswordForm) => {
  const { formatMessage } = useIntl()
  const [form, setForm] = useState<IRemindPassword>({
    email: '',
  })

  const [errorsForm, setErrors, clearErrors] = useObject<IRemindPasswordErrors>({
    email: undefined,
  })

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const isEmailValidate = formValidation.isEmailValidate(form.email)

  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    if (isEmailValidate.isValidate) {
      onSubmit(form.email)
    } else {
      setErrors({
        ...errorsForm,
        email: isEmailValidate.error,
      })
    }
  }

  const isVisibleSendButton = !!form.email.length

  useEffect(() => {
    if (statusCode === 200 && successMsg) clearErrors()
    const timeout = setTimeout(clearSuccessMsg, 3000)
    return () => clearTimeout(timeout)
  }, [statusCode, successMsg])

  return (
    <form onSubmit={sendData}>
      <div className='mb-3'>
        <LabelInput
          id='email'
          type='email'
          labelText={<FormattedMessage id='app.email' defaultMessage='Email' />}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errorsForm.email && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({
              id: errorsForm.email.translateId,
              defaultMessage: errorsForm.email.errorMsg,
            })}
          />
        )}
      </div>
      {errors && <Alert type={ALERT_TYPE.DANGER} text={errors} />}
      {successMsg && <Alert type={ALERT_TYPE.SUCCESS} text={successMsg} />}

      <button type='submit' className={`btn btn-primary ${styles.btn__primary}`} disabled={!isVisibleSendButton}>
        {isLoading
          ? formatMessage({ id: 'app.submitting', defaultMessage: 'Submitting...' })
          : formatMessage({ id: 'app.submit', defaultMessage: 'Submit' })}
      </button>
    </form>
  )
}

export default RemindPasswordForm
