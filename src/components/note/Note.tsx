import { useState } from 'react'
import trimText from '../../helpers/trimText'
import EditNote from '../edit-note/EditNote'
import Modal from '../modal/Modal'
import { Note as NoteType } from '../notes/Notes'
import SingleNoteModal from '../singleNoteModal/SingleNoteModal'

interface INote {
  note: NoteType
  handleRemoveNote: (id: string) => void
  handleDuplicateNote: (id: string) => void
  handleEditNote: (note: NoteType, cb: () => void) => void
}

const Note = ({ note, handleRemoveNote, handleDuplicateNote, handleEditNote }: INote) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const [displayRemoveModal, setDisplayRemoveModal] = useState<boolean>(false)
  const [displayEditModal, setDisplayEditModal] = useState<boolean>(false)
  const { id, title, desc, img } = note
  const handleClose = () => setDisplayModal(false)
  const openModal = () => setDisplayModal(true)
  const closeRemoveModal = () => setDisplayRemoveModal(false)
  const openRemoveModal = () => setDisplayRemoveModal(true)
  const closeEditModal = () => setDisplayEditModal(false)
  const openEditModal = () => setDisplayEditModal(true)

  return (
    <>
      <div className='card'>
        {img && <img src={img} className='card-img-top' alt='' />}
        <div className='card-body'>
          <h2 className='card-title'>{title}</h2>
          <p className='card-text'>{trimText(desc, 120, ' ')}</p>
          <div className='d-grid gap-2 d-md-flex justify-content-md-between'>
            <div className='gap-2 d-sm-flex justify-content-evenly'>
              <button
                type='button'
                className='btn btn-outline-danger btn-sm'
                onClick={openRemoveModal}
                title='Remove note'
              >
                <i className='bi bi-trash'></i>
              </button>
              <button type='button' className='btn btn-outline-danger btn-sm' onClick={openEditModal} title='Edit note'>
                <i className='bi bi-pencil'></i>
              </button>
              <button
                type='button'
                className='btn btn-outline-danger btn-sm'
                onClick={() => handleDuplicateNote(id)}
                title='Duplicate note'
              >
                <i className='bi bi-files'></i>
              </button>
            </div>
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
      {displayEditModal && <EditNote note={note} handleClose={closeEditModal} handleEditNote={handleEditNote} />}
    </>
  )
}

export default Note
