import { useState } from 'react'
import formValidation from '../../helpers/formValidation'
import Alert, { ALERT_TYPE } from '../alert/Alert'

interface IRemindPassword {
  handleOnSubmit: (email: string) => void
}

const RemindPasswordForm = ({ handleOnSubmit }: IRemindPassword) => {
  const [data, setData] = useState({
    email: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    form: '',
  })

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const isEmailValidate = formValidation.isEmailValidate(data.email)

  const sendData = (event: React.FormEvent) => {
    event.preventDefault()
    const { email } = data
    if (isEmailValidate.isValidate) {
      handleOnSubmit(email)
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

      <button type='submit' className='btn btn-primary' onClick={e => sendData(e)} disabled={!isVisibleSendButton}>
        Submit
      </button>
    </form>
  )
}

export default RemindPasswordForm
