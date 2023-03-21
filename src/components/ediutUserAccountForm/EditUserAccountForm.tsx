import { useEffect } from 'react'
import useObject from '../../hooks/useObject'
import { IUser } from '../../hooks/useUsers'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import stylesBtn from '../../styles/buttons.module.scss'
import formValidation from '../../helpers/formValidation'
import { useIntl } from 'react-intl'
import useFetch from '../../hooks/useFetch'

type FieldError = { translateId: string; errorMsg: string } | undefined

interface IErrorsFields {
  email: FieldError
  username: FieldError
}

interface IResponse {
  message: string
  data: IUser
}

interface IEditUserAccount {
  userData: IUser
}

const EditUserAccount = ({ userData }: IEditUserAccount) => {
  const { formatMessage } = useIntl()
  const [user, updateUser] = useObject<IUser>(userData)
  const { data, successMsg, clearSuccessMsg, errors, isLoading, fetchData, statusCode } = useFetch<IResponse>()
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
      fetchData('user/me', 'PATCH', updatedUser)
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
  }, [statusCode, data])

  return (
    <form>
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
        onClick={handleSendData}
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
