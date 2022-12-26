import { useState } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import styles from '../../styles/buttons.module.scss'

interface IRegisterForm {
  handleOnSubmit: (
    username: string,
    email: string,
    password: string,
    cbError: React.Dispatch<React.SetStateAction<{ form: string }>>,
    cbSuccess: (msg: string) => void,
  ) => void
}

const RegisterForm = ({ handleOnSubmit }: IRegisterForm) => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<{
    username?: string
    email?: string
    password?: string
    form: string
  }>({
    username: '',
    email: '',
    password: '',
    form: '',
  })

  const [success, setSuccess] = useState('')

  const setSuccesMsg = (msg: string) => {
    setErrors({
      username: '',
      email: '',
      password: '',
      form: '',
    })
    setSuccess(msg)
  }

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const isUsernameValidate = formValidation.isUsernameValidate(data.username)
  const isEmailValidate = formValidation.isEmailValidate(data.email)
  const isPasswordValidate = formValidation.isPasswordValidate(data.password)

  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    const { username, email, password } = data
    if (isEmailValidate.isValidate && isPasswordValidate.isValidate && isUsernameValidate.isValidate) {
      handleOnSubmit(username, email, password, setErrors, setSuccesMsg)
    } else {
      setErrors({
        ...errors,
        username: isUsernameValidate.errorMsg,
        email: isEmailValidate.errorMsg,
        password: isPasswordValidate.errorMsg,
      })
    }
  }

  const isVisibleSendButton = !!data.email.length && !!data.password.length && !!data.username.length

  return (
    <form>
      <div className='mb-3'>
        <LabelInput id='username' type='text' labelText='Username' onChange={setDataOnChange} isLabelVisible />
        {errors.username && <Alert type={ALERT_TYPE.DANGER} text={errors.username} />}
      </div>
      <div className='mb-3'>
        <LabelInput id='email' type='email' labelText='Email' onChange={setDataOnChange} isLabelVisible />
        {errors.email && <Alert type={ALERT_TYPE.DANGER} text={errors.email} />}
      </div>
      <div className='mb-3'>
        <LabelInput id='password' type='password' labelText='Password' onChange={setDataOnChange} isLabelVisible />
        {errors.password && <Alert type={ALERT_TYPE.DANGER} text={errors.password} />}
      </div>
      {errors.form && <Alert type={ALERT_TYPE.DANGER} text={errors.form} />}
      {success && <Alert type={ALERT_TYPE.SUCCESS} text={success} />}

      <button
        type='submit'
        className={`btn btn-primary ${styles.btn__primary}`}
        onClick={e => sendData(e)}
        disabled={!isVisibleSendButton}
      >
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
