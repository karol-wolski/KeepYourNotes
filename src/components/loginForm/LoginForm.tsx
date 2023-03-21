import { useState, useEffect, useContext } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import styles from '../../styles/buttons.module.scss'
import { FormattedMessage, useIntl } from 'react-intl'
import useFetch from '../../hooks/useFetch'
import useObject from '../../hooks/useObject'
import { AuthContext, IAuthContext } from '../../context/AuthContext'
import { addToLocalStorage } from '../../helpers/localStorage'

interface ILoginForm {
  email: string
  password: string
}

type FieldError = { translateId: string; errorMsg: string } | undefined

interface ILoginErrors {
  email: FieldError
  password: FieldError
}

interface IResponse {
  token: string
}

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(AuthContext) as IAuthContext
  const { data, errors, isLoading, fetchData, statusCode } = useFetch<IResponse>()
  const [form, setForm] = useState<ILoginForm>({
    email: '',
    password: '',
  })

  const [errorsForm, setErrors, clearErrors] = useObject<ILoginErrors>({
    email: undefined,
    password: undefined,
  })

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const isEmailValidate = formValidation.isEmailValidate(form.email)
  const isPasswordValidate = formValidation.isPasswordValidate(form.password)

  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    const { email, password } = form
    if (isEmailValidate.isValidate && isPasswordValidate.isValidate) {
      fetchData('auth/login', 'POST', { email: email, password: password })
    } else {
      setErrors({
        email: isEmailValidate.error,
        password: isPasswordValidate.error,
      })
    }
  }

  const isVisibleSendButton = !!form.email.length && !!form.password.length
  const { formatMessage } = useIntl()

  useEffect(() => {
    if (statusCode === 200 && data) {
      clearErrors()
      addToLocalStorage('token', data.token)
      setIsLoggedIn((state: boolean) => !state)
    }
  }, [statusCode, data])

  return (
    <form>
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
      <div className='mb-3'>
        <LabelInput
          id='password'
          type='password'
          labelText={<FormattedMessage id='app.password' defaultMessage='Password' />}
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
      {errors && <Alert type={ALERT_TYPE.DANGER} text={errors} />}

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

export default LoginForm
