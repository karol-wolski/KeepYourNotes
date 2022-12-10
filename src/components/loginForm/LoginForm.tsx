import { useState } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'

interface ILoginForm {
  handleOnSubmit: (
    email: string,
    password: string,
    cb: React.Dispatch<React.SetStateAction<{ email?: string; password?: string; form: string }>>,
  ) => void
}

const LoginForm = ({ handleOnSubmit }: ILoginForm) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    form: string
  }>({
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

  const isEmailValidate = formValidation.isEmailValidate(data.email)

  const isPasswordValidate = formValidation.isPasswordValidate(data.password)

  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    const { email, password } = data
    if (isEmailValidate.isValidate && isPasswordValidate.isValidate) {
      handleOnSubmit(email, password, setErrors)
    } else {
      setErrors({
        form: '',
        email: isEmailValidate.errorMsg,
        password: isPasswordValidate.errorMsg,
      })
    }
  }

  const isVisibleSendButton = !!data.email.length && !!data.password.length

  return (
    <form>
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

export default LoginForm
