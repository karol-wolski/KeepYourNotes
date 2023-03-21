import { useState, useEffect } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import styles from '../../styles/buttons.module.scss'
import { useIntl } from 'react-intl'
import useFetch from '../../hooks/useFetch'
import useObject from '../../hooks/useObject'

interface IRegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

type FieldError = { translateId: string; errorMsg: string } | undefined

interface IRegisterFormErrors {
  username: FieldError
  email: FieldError
  password: FieldError
  confirmPassword: FieldError
}

interface IResponse {
  message: string
}

const RegisterForm = () => {
  const { formatMessage } = useIntl()
  const { data, errors, successMsg, clearSuccessMsg, isLoading, fetchData, statusCode } = useFetch<IResponse>()
  const [form, setForm] = useState<IRegisterForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errorsForm, setErrors, clearErrors] = useObject<IRegisterFormErrors>({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  })

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const isUsernameValidate = formValidation.isUsernameValidate(form.username)
  const isEmailValidate = formValidation.isEmailValidate(form.email)
  const isPasswordValidate = formValidation.isPasswordValidate(form.password)
  const isConfirmPasswordValidate = formValidation.isConfirmPasswordValidate(form.password, form.confirmPassword)

  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    const { username, email, password } = form
    if (
      isEmailValidate.isValidate &&
      isPasswordValidate.isValidate &&
      isUsernameValidate.isValidate &&
      isConfirmPasswordValidate.isValidate
    ) {
      fetchData('auth/register', 'POST', { username: username, email: email, password: password })
    } else {
      setErrors({
        ...errorsForm,
        username: isUsernameValidate.error,
        email: isEmailValidate.error,
        password: isPasswordValidate.error,
        confirmPassword: isConfirmPasswordValidate.error,
      })
    }
  }

  const isVisibleSendButton =
    !!form.email.length && !!form.password.length && !!form.username.length && !!form.confirmPassword.length

  useEffect(() => {
    if (statusCode === 200 && successMsg) clearErrors()
    const timeout = setTimeout(clearSuccessMsg, 3000)
    return () => clearTimeout(timeout)
  }, [statusCode, data])

  return (
    <form>
      <div className='mb-3'>
        <LabelInput
          id='username'
          type='text'
          labelText={formatMessage({ id: 'app.username', defaultMessage: 'Username' })}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errorsForm.username && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({ id: errorsForm.username.translateId, defaultMessage: errorsForm.username.errorMsg })}
          />
        )}
      </div>
      <div className='mb-3'>
        <LabelInput
          id='email'
          type='email'
          labelText={formatMessage({ id: 'app.email', defaultMessage: 'Email' })}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errorsForm.email && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({ id: errorsForm.email.translateId, defaultMessage: errorsForm.email.errorMsg })}
          />
        )}
      </div>
      <div className='mb-3'>
        <LabelInput
          id='password'
          type='password'
          labelText={formatMessage({ id: 'app.password', defaultMessage: 'Password' })}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errorsForm.password && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({ id: errorsForm.password.translateId, defaultMessage: errorsForm.password.errorMsg })}
          />
        )}
      </div>
      <div className='mb-3'>
        <LabelInput
          id='confirmPassword'
          type='password'
          labelText={formatMessage({ id: 'app.passwordConfirm', defaultMessage: 'Confirm Password' })}
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
      {successMsg && <Alert type={ALERT_TYPE.SUCCESS} text={successMsg} />}

      <button
        type='submit'
        className={`btn btn-primary ${styles.btn__primary}`}
        onClick={e => sendData(e)}
        disabled={!isVisibleSendButton}
      >
        {isLoading
          ? formatMessage({ id: 'app.submitting', defaultMessage: 'Submitting...' })
          : formatMessage({ id: 'app.submit', defaultMessage: 'submit...' })}
      </button>
    </form>
  )
}

export default RegisterForm
