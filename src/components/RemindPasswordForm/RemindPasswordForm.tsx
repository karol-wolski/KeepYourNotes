import { useState } from 'react'
import { STATUS } from '../../constants/constants'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'

interface IRemindPassword {
  handleOnSubmit: (email: string, cb: (status: string, msg: string) => void) => void
}

const RemindPasswordForm = ({ handleOnSubmit }: IRemindPassword) => {
  const [data, setData] = useState({
    email: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    form: '',
  })

  const [success, setSuccess] = useState('')

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const isEmailValidate = formValidation.isEmailValidate(data.email)

  const setApiMsg = (status: string, msg: string) => {
    if (status === STATUS.SUCCESS) {
      setErrors({
        email: '',
        form: '',
      })
      setSuccess(msg)
    }
    if (status === STATUS.ERROR) {
      setErrors({ ...errors, form: msg })
      setSuccess('')
    }
  }

  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    const { email } = data
    if (isEmailValidate.isValidate) {
      handleOnSubmit(email, setApiMsg)
    } else {
      setErrors({
        ...errors,
        email: isEmailValidate.errorMsg,
      })
    }
  }

  const isVisibleSendButton = !!data.email.length

  return (
    <form>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input type='email' className='form-control' id='email' onChange={setDataOnChange} name='email' />
        {errors.email && <Alert type={ALERT_TYPE.DANGER} text={errors.email} />}
      </div>
      {errors.form && <Alert type={ALERT_TYPE.DANGER} text={errors.form} />}
      {success && <Alert type={ALERT_TYPE.SUCCESS} text={success} />}

      <button type='submit' className='btn btn-primary' onClick={e => sendData(e)} disabled={!isVisibleSendButton}>
        Submit
      </button>
    </form>
  )
}

export default RemindPasswordForm
