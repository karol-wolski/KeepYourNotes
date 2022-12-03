import { useState } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'

interface IResetPassword {
  handleOnSubmit: (password: string) => void
}

const ResetPasswordForm = ({ handleOnSubmit }: IResetPassword) => {
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    form: '',
  })

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const isPasswordValidate = formValidation.isPasswordValidate(data.password)
  const isConfirmPasswordValidate = formValidation.isConfirmPasswordValidate(data.password, data.confirmPassword)

  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    const { password } = data
    if (isPasswordValidate.isValidate && isConfirmPasswordValidate.isValidate) {
      handleOnSubmit(password)
    } else {
      setErrors({
        ...errors,
        password: isPasswordValidate.errorMsg,
        confirmPassword: isConfirmPasswordValidate.errorMsg,
      })
    }
  }

  const isVisibleSendButton = !!data.password.length && !!data.confirmPassword.length

  return (
    <form>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input type='password' className='form-control' id='password' name='password' onChange={setDataOnChange} />
        {errors.password && <Alert type={ALERT_TYPE.DANGER} text={errors.password} />}
      </div>
      <div className='mb-3'>
        <label htmlFor='confirmPassword' className='form-label'>
          Confirm Password
        </label>
        <input
          type='password'
          className='form-control'
          id='confirmPassword'
          name='confirmPassword'
          onChange={setDataOnChange}
        />
        {errors.confirmPassword && <Alert type={ALERT_TYPE.DANGER} text={errors.confirmPassword} />}
      </div>
      {errors.form && <Alert type={ALERT_TYPE.DANGER} text={errors.form} />}

      <button type='submit' className='btn btn-primary' onClick={e => sendData(e)} disabled={!isVisibleSendButton}>
        Submit
      </button>
    </form>
  )
}

export default ResetPasswordForm
