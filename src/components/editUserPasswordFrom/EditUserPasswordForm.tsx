import React, { useEffect } from 'react'
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

interface IErrorsFields {
  currentPassword: { translateId: string; errorMsg: string } | undefined
  password: { translateId: string; errorMsg: string } | undefined
  confirmPassword: { translateId: string; errorMsg: string } | undefined
}

interface IEditUserPassword {
  isLoading?: boolean
  errors?: string
  statusCode?: number
  successMsg?: string
  clearSuccessMsg: () => void
  onSubmit: (newPasswordData: INewPassword) => void
}

const EditUserPasswordForm = ({
  onSubmit,
  isLoading,
  errors,
  statusCode,
  successMsg,
  clearSuccessMsg,
}: IEditUserPassword) => {
  const { formatMessage } = useIntl()
  const [form, setForm] = useObject<IPasswordFields>({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  })

  const [errorsForm, setErrors, clearErrors] = useObject<IErrorsFields>({
    currentPassword: undefined,
    password: undefined,
    confirmPassword: undefined,
  })

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const isCurrentPasswordValidate = formValidation.isPasswordValidate(form.currentPassword)
  const isPasswordValidate = formValidation.isPasswordValidate(form.password)
  const isConfirmPasswordValidate = formValidation.isConfirmPasswordValidate(form.password, form.confirmPassword)
  const isVisibleSendButton = !!form.currentPassword.length && !!form.password.length && !!form.confirmPassword.length

  const handleSendData = (event: React.FormEvent) => {
    event.preventDefault()
    const newPasswordData: INewPassword = {
      password: form.currentPassword,
      newPassword: form.password,
    }
    if (isCurrentPasswordValidate.isValidate && isPasswordValidate.isValidate && isConfirmPasswordValidate.isValidate) {
      onSubmit(newPasswordData)
    } else {
      setErrors({
        ...errorsForm,
        currentPassword: isCurrentPasswordValidate.error,
        password: isPasswordValidate.error,
        confirmPassword: isConfirmPasswordValidate.error,
      })
    }
  }

  useEffect(() => {
    if (statusCode === 200 && successMsg) clearErrors()
    const timeout = setTimeout(clearSuccessMsg, 3000)
    return () => clearTimeout(timeout)
  }, [statusCode, successMsg])

  return (
    <form onSubmit={handleSendData}>
      <div className='mb-3'>
        <LabelInput
          id='currentPassword'
          type='password'
          labelText={formatMessage({ id: 'app.passwordCurrent', defaultMessage: 'Current Password' })}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errorsForm.currentPassword && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({
              id: errorsForm.currentPassword.translateId,
              defaultMessage: errorsForm.currentPassword.errorMsg,
            })}
          />
        )}
      </div>
      <div className='mb-3'>
        <LabelInput
          id='password'
          type='password'
          labelText={formatMessage({ id: 'app.password', defaultMessage: 'Password' })}
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
      <div className='mb-3'>
        <LabelInput
          id='confirmPassword'
          type='password'
          labelText={formatMessage({ id: 'app.passwordConfirm', defaultMessage: 'Confirm Password' })}
          onChange={setDataOnChange}
          isLabelVisible
        />
        {errorsForm.confirmPassword && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({
              id: errorsForm.confirmPassword.translateId,
              defaultMessage: errorsForm.confirmPassword.errorMsg,
            })}
          />
        )}
      </div>
      {errors && <Alert type={ALERT_TYPE.DANGER} text={errors} />}
      {successMsg && <Alert type={ALERT_TYPE.SUCCESS} text={successMsg} />}

      <button type='submit' className={`btn btn-primary ${stylesBtn.btn__primary}`} disabled={!isVisibleSendButton}>
        {isLoading
          ? formatMessage({ id: 'app.submitting', defaultMessage: 'Submitting...' })
          : formatMessage({ id: 'app.submit', defaultMessage: 'submit...' })}
      </button>
    </form>
  )
}

export default EditUserPasswordForm
