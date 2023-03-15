import React, { useState } from 'react'
import formValidation from '../../helpers/formValidation'
import useObject from '../../hooks/useObject'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import stylesBtn from '../../styles/buttons.module.scss'
import { useIntl } from 'react-intl'

export interface INewPassword {
  password: string
  newPassword: string
}

interface IPasswordFields {
  currentPassword: string
  password: string
  confirmPassword: string
}

interface IErrorsFields extends IPasswordFields {
  form: string
}

interface IEditUserPassword {
  sendData: (password: INewPassword, cb: (status: number, message: string) => void) => void
}

const EditUserPasswordForm = ({ sendData }: IEditUserPassword) => {
  const [data, setData] = useObject<IPasswordFields>({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors, clearErrors] = useObject<IErrorsFields>({
    currentPassword: '',
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

  const setMessage = (status: number, message: string) => {
    if (status === 200) {
      setSuccess(message)
      clearErrors()
    } else {
      setSuccess('')
      setErrors({ ...errors, form: message })
    }
  }

  const isCurrentPasswordValidate = formValidation.isPasswordValidate(data.currentPassword)
  const isPasswordValidate = formValidation.isPasswordValidate(data.password)
  const isConfirmPasswordValidate = formValidation.isConfirmPasswordValidate(data.password, data.confirmPassword)
  const isVisibleSendButton = !!data.currentPassword.length && !!data.password.length && !!data.confirmPassword.length

  const handleSendData = (event: React.FormEvent) => {
    event.preventDefault()
    const newPasswordData: INewPassword = {
      password: data.currentPassword,
      newPassword: data.password,
    }
    if (isCurrentPasswordValidate.isValidate && isPasswordValidate.isValidate && isConfirmPasswordValidate.isValidate) {
      sendData(newPasswordData, setMessage)
    } else {
      setErrors({
        ...errors,
        currentPassword: isCurrentPasswordValidate.errorMsg,
        password: isPasswordValidate.errorMsg,
        confirmPassword: isConfirmPasswordValidate.errorMsg,
      })
    }
  }

  const { formatMessage } = useIntl()

  return (
    <form>
      <div className='mb-3'>
        <LabelInput
          id='currentPassword'
          type='password'
          labelText={formatMessage({ id: 'app.passwordCurrent', defaultMessage: 'Current Password' })}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errors.password && <Alert type={ALERT_TYPE.DANGER} text={errors.password} />}
      </div>
      <div className='mb-3'>
        <LabelInput
          id='password'
          type='password'
          labelText={formatMessage({ id: 'app.password', defaultMessage: 'Password' })}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errors.password && <Alert type={ALERT_TYPE.DANGER} text={errors.password} />}
      </div>
      <div className='mb-3'>
        <LabelInput
          id='confirmPassword'
          type='password'
          labelText={formatMessage({ id: 'app.passwordConfirm', defaultMessage: 'Confirm Password' })}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errors.confirmPassword && <Alert type={ALERT_TYPE.DANGER} text={errors.confirmPassword} />}
      </div>
      {errors.form && <Alert type={ALERT_TYPE.DANGER} text={errors.form} />}
      {success && <Alert type={ALERT_TYPE.SUCCESS} text={success} />}

      <button
        type='submit'
        className={`btn btn-primary ${stylesBtn.btn__primary}`}
        onClick={handleSendData}
        disabled={!isVisibleSendButton}
      >
        {formatMessage({ id: 'app.submit', defaultMessage: 'Submit' })}
      </button>
    </form>
  )
}

export default EditUserPasswordForm
