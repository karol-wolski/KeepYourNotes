import { useEffect } from 'react'
import useObject from '../../hooks/useObject'
import { IUser } from '../../hooks/useUsers'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import stylesBtn from '../../styles/buttons.module.scss'
import formValidation from '../../helpers/formValidation'
import { useIntl } from 'react-intl'

type FieldError = { translateId: string; errorMsg: string } | undefined

interface IErrorsFields {
  email: FieldError
  username: FieldError
}

interface IEditUserAccount {
  userData: IUser
  isLoading?: boolean
  errors?: string
  statusCode?: number
  successMsg?: string
  clearSuccessMsg: () => void
  onSubmit: ({ email, username }: IUser) => void
}

const EditUserAccount = ({
  userData,
  onSubmit,
  isLoading,
  errors,
  statusCode,
  successMsg,
  clearSuccessMsg,
}: IEditUserAccount) => {
  const { formatMessage } = useIntl()
  const [user, updateUser] = useObject<IUser>(userData)
  const [errorsForm, setErrors, clearErrors] = useObject<IErrorsFields>({
    email: undefined,
    username: undefined,
  })

  const { username, email } = user

  const setDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({
      ...user,
      [event.target.name]: event.target.value,
    })
  }

  const isEmailValidate = formValidation.isEmailValidate(email)
  const isUsernameValidate = formValidation.isUsernameValidate(username)
  const isVisibleSendButton = !!user.email.length || !!user.username.length

  const handleSendData = (event: React.FormEvent) => {
    event.preventDefault()
    if (isUsernameValidate.isValidate && isEmailValidate.isValidate) {
      const updatedUser = {
        username: username,
        email: email,
      }
      onSubmit(updatedUser)
    } else {
      setErrors({
        ...errorsForm,
        email: isEmailValidate.error,
        username: isUsernameValidate.error,
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
      <div>
        <LabelInput
          id='username'
          type='text'
          labelText={formatMessage({ id: 'app.username', defaultMessage: 'Username' })}
          onChange={setDataOnChange}
          value={username}
          isLabelVisible
        />
        {errorsForm.username && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({
              id: errorsForm.username.translateId,
              defaultMessage: errorsForm.username.errorMsg,
            })}
          />
        )}
      </div>
      <div>
        <LabelInput
          id='email'
          type='email'
          labelText={formatMessage({ id: 'app.email', defaultMessage: 'Email' })}
          onChange={setDataOnChange}
          value={email}
          isLabelVisible
        />
        {errorsForm.email && (
          <Alert
            type={ALERT_TYPE.DANGER}
            text={formatMessage({
              id: errorsForm.email.translateId,
              defaultMessage: errorsForm.email.errorMsg,
            })}
          />
        )}
      </div>
      {errors && <Alert type={ALERT_TYPE.DANGER} text={errors} />}
      {successMsg && <Alert type={ALERT_TYPE.SUCCESS} text={successMsg} />}

      <button
        type='submit'
        className={`btn btn-primary ${stylesBtn.btn__primary} mt-2`}
        disabled={!isVisibleSendButton}
      >
        {isLoading
          ? formatMessage({ id: 'app.submitting', defaultMessage: 'Submitting...' })
          : formatMessage({ id: 'app.submit', defaultMessage: 'submit...' })}
      </button>
    </form>
  )
}

export default EditUserAccount
