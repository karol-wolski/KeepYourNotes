import { useState } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'

interface IRegisterForm {
  handleOnSubmit: (username: string, email: string, password: string) => void
}

const RegisterForm = ({ handleOnSubmit }: IRegisterForm) => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    form: '',
  })

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
      handleOnSubmit(username, email, password)
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
        <label htmlFor='username' className='form-label'>
          Username
        </label>
        <input type='text' className='form-control' id='username' onChange={setDataOnChange} name='username' />
        {errors.username && <Alert type={ALERT_TYPE.DANGER} text={errors.username} />}
      </div>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input type='email' className='form-control' id='email' onChange={setDataOnChange} name='email' />
        {errors.email && <Alert type={ALERT_TYPE.DANGER} text={errors.email} />}
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input type='password' className='form-control' id='password' name='password' onChange={setDataOnChange} />
        {errors.password && <Alert type={ALERT_TYPE.DANGER} text={errors.password} />}
      </div>
      {errors.form && <Alert type={ALERT_TYPE.DANGER} text={errors.form} />}

      <button type='submit' className='btn btn-primary' onClick={e => sendData(e)} disabled={!isVisibleSendButton}>
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
