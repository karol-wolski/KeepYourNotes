import styles from './LabelInput.module.scss'

interface ILabelInput {
  id: string
  type: string
  labelText: string
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
  return (
    <>
      <label htmlFor={id} className={`form-label ${!isLabelVisible && 'visually-hidden'} `}>
        {labelText}
      </label>
      <input
        type={type}
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
    </>
  )
}

export default LabelInput
