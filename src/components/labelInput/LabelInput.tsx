import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import styles from './LabelInput.module.scss'

interface ILabelInput {
  id: string
  type: string
  labelText: string | ReactElement
  isLabelVisible: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  value?: string
  multiple?: boolean
  inputRef?: React.RefObject<HTMLInputElement>
}
const LabelInput = ({
  id,
  type,
  labelText,
  onChange,
  onKeyDown,
  isLabelVisible,
  placeholder,
  value,
  multiple = false,
  inputRef,
}: ILabelInput) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggle = () => setShowPassword(prevState => !prevState)
  const inputTypeIfPassword = type === 'password' && showPassword ? 'text' : 'password'

  const { formatMessage } = useIntl()

  const showHidePassword = showPassword
    ? formatMessage({ id: 'app.hidePassword', defaultMessage: 'Hide password' })
    : formatMessage({ id: 'app.showPassword', defaultMessage: 'Show password' })

  return (
    <>
      <label htmlFor={id} className={`form-label ${!isLabelVisible && 'visually-hidden'} `}>
        {labelText}
      </label>
      <div className='position-relative'>
        <input
          type={type === 'password' ? inputTypeIfPassword : type}
          className={`form-control ${styles.input}`}
          id={id}
          onChange={onChange}
          onKeyDown={onKeyDown}
          name={id}
          placeholder={placeholder}
          defaultValue={value}
          multiple={multiple}
          ref={inputRef}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={toggle}
            className='position-absolute top-0 end-0 h-100 bg-transparent border-0'
            aria-label={showHidePassword}
            title={showHidePassword}
          >
            {showPassword ? <i className='bi bi-eye-slash'></i> : <i className='bi bi-eye'></i>}
          </button>
        )}
      </div>
    </>
  )
}

export default LabelInput
