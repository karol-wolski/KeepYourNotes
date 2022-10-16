import { INote } from '../note/Note'

interface IModal extends INote {
  handleClose: () => void
}

const SingleNoteModal = ({ title, desc, img, handleClose }: IModal) => {
  return (
    <div
      className='modal fade show'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex={-1}
      aria-labelledby='staticBackdropLabel'
      aria-hidden='false'
      style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='staticBackdropLabel'>
              {title}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={handleClose}
            ></button>
          </div>
          <div className='modal-body'>
            {img}
            {desc}
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleNoteModal
