interface ISpinner {
  altText: string
  classCSS?: string
}

const Spinner = ({ altText, classCSS }: ISpinner) => {
  return (
    <div className={`spinner-border spinner-border-sm ${classCSS}`} role='status'>
      <span className='visually-hidden'>{altText}</span>
    </div>
  )
}

export default Spinner
