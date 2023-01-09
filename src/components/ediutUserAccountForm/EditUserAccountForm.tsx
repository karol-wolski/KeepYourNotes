import { useState } from 'react'
import useObject from '../../hooks/useObject'
import { IUser } from '../../hooks/useUsers'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import stylesBtn from '../../styles/buttons.module.scss'
import formValidation from '../../helpers/formValidation'

interface IErrorsFields extends IUser {
  form: string
}

interface IEditUserAccount {
  userData: IUser
  sendData: (user: IUser, cb: (status: number, message: string) => void) => void
}

const EditUserAccount = ({ userData, sendData }: IEditUserAccount) => {
  const [user, updateUser] = useObject<IUser>(userData)
  const [errors, setErrors, clearErrors] = useObject<IErrorsFields>({
    email: '',
    username: '',
    form: '',
  })

  const [success, setSuccess] = useState('')

  const { username, email } = user

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({
      ...user,
      [event.target.name]: event.target.value,
    })
  }

  const isVisibleSendButton = !!user.email.length || !!user.username.length

  const setMessage = (status: number, message: string) => {
    if (status === 200) {
      setSuccess(message)
      clearErrors()
    } else {
      setSuccess('')
      setErrors({ ...errors, form: message })
    }
  }

  const isEmailValidate = formValidation.isEmailValidate(email)
  const isUsernameValidate = formValidation.isUsernameValidate(username)

  const handleSendData = (event: React.FormEvent) => {
    event.preventDefault()
    if (isUsernameValidate.isValidate && isEmailValidate.isValidate) {
      const newUser = {
        username: username,
        email: email,
      }
      sendData(newUser, setMessage)
    } else {
      setErrors({
        ...errors,
        email: isEmailValidate.errorMsg,
        username: isUsernameValidate.errorMsg,
      })
    }
  }

  return (
    <form>
      <div>
        <LabelInput
          id='username'
          type='text'
          labelText='username'
          onChange={setDataOnChange}
          value={username}
          isLabelVisible
        />
        {errors.username && <Alert type={ALERT_TYPE.DANGER} text={errors.username} />}
      </div>
      <div>
        <LabelInput id='email' type='email' labelText='Email' onChange={setDataOnChange} value={email} isLabelVisible />
        {errors.username && <Alert type={ALERT_TYPE.DANGER} text={errors.username} />}
      </div>
      {errors.form && <Alert type={ALERT_TYPE.DANGER} text={errors.form} />}
      {success && <Alert type={ALERT_TYPE.SUCCESS} text={success} />}

      <button
        type='submit'
        className={`btn btn-primary ${stylesBtn.btn__primary} mt-2`}
        onClick={handleSendData}
        disabled={!isVisibleSendButton}
      >
        Submit
      </button>
    </form>
  )
}

export default EditUserAccount
