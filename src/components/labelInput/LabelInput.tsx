import styles from './LabelInput.module.scss'

interface ILabelInput {
  id: string
  type: string
  labelText: string
  isLabelVisible: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const LabelInput = ({ id, type, labelText, onChange, isLabelVisible }: ILabelInput) => {
  console.log(isLabelVisible)
  return (
    <>
      <label htmlFor={id} className={`form-label ${!isLabelVisible && 'visually-hidden'} `}>
        {labelText}
      </label>
      <input type={type} className={`form-control ${styles.input}`} id={id} onChange={onChange} name={id} />
    </>
  )
}

export default LabelInput
