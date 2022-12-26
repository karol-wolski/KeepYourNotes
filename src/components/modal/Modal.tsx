import { ReactNode } from 'react'
import stylesBtn from '../../styles/buttons.module.scss'
import stylesModal from './Modal.module.scss'
interface IModal {
  title: string
  children: ReactNode
  btnName?: string
  handleBtnEvent?: () => void
  handleClose: () => void
  isDisabledBtn?: boolean
}

const Modal = ({ title, children, btnName, handleBtnEvent, handleClose, isDisabledBtn = false }: IModal) => {
  return (
    <div className={`modal fade show ${stylesModal.modal}`} tabIndex={-1}>
      <div className='modal-dialog'>
        <div className={`modal-content ${stylesModal.modal__content}`}>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={handleClose}
            ></button>
          </div>
          <div className='modal-body'>{children}</div>
          <div className='modal-footer'>
            <button
              type='button'
              className={`btn btn-secondary ${stylesBtn.btn__secondary}`}
              data-bs-dismiss='modal'
              onClick={handleClose}
            >
              Close
            </button>
            {btnName && handleBtnEvent && (
              <button
                type='button'
                className={`btn btn-primary ${stylesBtn.btn__primary}`}
                onClick={handleBtnEvent}
                disabled={isDisabledBtn}
              >
                {btnName}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
