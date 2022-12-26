import { useState } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import styles from '../../styles/buttons.module.scss'

interface IResetPassword {
  handleOnSubmit: (password: string, cb: (msg: string) => void) => void
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

  const [success, setSuccess] = useState('')

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const setApiMsg = (msg: string) => {
    setErrors({
      password: '',
      confirmPassword: '',
      form: '',
    })
    setSuccess(msg)
  }

  const isPasswordValidate = formValidation.isPasswordValidate(data.password)
  const isConfirmPasswordValidate = formValidation.isConfirmPasswordValidate(data.password, data.confirmPassword)

  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    const { password } = data
    if (isPasswordValidate.isValidate && isConfirmPasswordValidate.isValidate) {
      handleOnSubmit(password, setApiMsg)
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
        <LabelInput id='password' type='password' labelText='Password' onChange={setDataOnChange} isLabelVisible />
        {errors.password && <Alert type={ALERT_TYPE.DANGER} text={errors.password} />}
      </div>
      <div className='mb-3'>
        <LabelInput
          id='confirmPassword'
          type='password'
          labelText='Confirm Password'
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errors.confirmPassword && <Alert type={ALERT_TYPE.DANGER} text={errors.confirmPassword} />}
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

export default ResetPasswordForm
