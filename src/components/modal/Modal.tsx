import { ReactNode } from 'react'
import FocusTrap from 'focus-trap-react'
import stylesBtn from '../../styles/buttons.module.scss'
import stylesModal from './Modal.module.scss'
interface IModal {
  title: string
  children: ReactNode
  btnName?: string
  handleBtnEvent?: ((e: React.FormEvent) => Promise<void>) | (() => void)
  handleClose: () => void
  isDisabledBtn?: boolean
  isOpen: boolean
  btnSubmitType?: 'submit' | 'button'
}

const Modal = ({
  title,
  children,
  btnName,
  handleBtnEvent,
  handleClose,
  isDisabledBtn = false,
  isOpen,
  btnSubmitType = 'button',
}: IModal) => {
  return (
    <FocusTrap active={isOpen}>
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
            <div className={`modal-body ${stylesModal.modal__body}`}>{children}</div>
            <div className='modal-footer'>
              <button
                type='button'
                className={`btn btn-secondary ${stylesBtn.btn__secondary}`}
                data-bs-dismiss='modal'
                onClick={handleClose}
              >
                Close
              </button>
              {btnName && (
                <button
                  type={btnSubmitType}
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
    </FocusTrap>
  )
}

export default Modal
