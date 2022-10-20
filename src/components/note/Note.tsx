import { useState } from 'react'
import trimText from '../../helpers/trimText'
import Modal from '../modal/Modal'
import SingleNoteModal from '../singleNoteModal/SingleNoteModal'

interface INote {
  id: string
  title: string
  desc: string
  img?: string
  handleRemoveNote: (id: string) => void
}

const Note = ({ id, title, desc, img, handleRemoveNote }: INote) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const [displayRemoveModal, setDisplayRemoveModal] = useState<boolean>(false)

  const handleClose = () => setDisplayModal(false)
  const openModal = () => setDisplayModal(true)
  const closeRemoveModal = () => setDisplayRemoveModal(false)
  const openRemoveModal = () => setDisplayRemoveModal(true)

  return (
    <>
      <div className='card'>
        {img && <img src={img} className='card-img-top' alt='' />}
        <div className='card-body'>
          <h2 className='card-title'>{title}</h2>
          <p className='card-text'>{trimText(desc, 120, ' ')}</p>
          <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
            <button type='button' className='btn btn-outline-danger btn-sm' onClick={openRemoveModal}>
              <i className='bi bi-trash'></i>
            </button>
            <button type='button' className='btn btn-primary btn-sm' onClick={openModal}>
              See full note
            </button>
          </div>
        </div>
      </div>
      {displayModal && <SingleNoteModal title={title} desc={desc} img={img} handleClose={handleClose} />}
      {displayRemoveModal && (
        <Modal
          title={`Remove note: ${title} `}
          desc='Are you sure you want to delete this note?'
          btnName='Remove'
          handleBtnEvent={() => handleRemoveNote(id)}
          handleClose={closeRemoveModal}
        />
      )}
    </>
  )
}

export default Note
