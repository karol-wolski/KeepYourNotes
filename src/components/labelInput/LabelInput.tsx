import styles from './LabelInput.module.scss'

interface ILabelInput {
  id: string
  type: string
  labelText: string
  isLabelVisible: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  value?: string
  multiple?: boolean
}
const LabelInput = ({
  id,
  type,
  labelText,
  onChange,
  isLabelVisible,
  placeholder,
  value,
  multiple = false,
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
        name={id}
        placeholder={placeholder}
        defaultValue={value}
        multiple={multiple}
      />
    </>
  )
}

export default LabelInput
