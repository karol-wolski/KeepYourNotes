interface IModal {
  title: string
  desc: string
  btnName: string
  handleBtnEvent: () => void
  handleClose: () => void
}

const Modal = ({ title, desc, btnName, handleBtnEvent, handleClose }: IModal) => {
  return (
    <div className='modal fade show' tabIndex={-1} style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <p>{desc}</p>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={handleClose}>
              Close
            </button>
            <button type='button' className='btn btn-primary' onClick={handleBtnEvent}>
              {btnName}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
