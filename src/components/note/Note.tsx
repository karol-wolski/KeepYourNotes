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
  const { id, title, desc, img, categories } = note
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
          <div className='d-flex gap-2 justify-start'>
            {categories &&
              categories.map(category => {
                return (
                  <button
                    key={`${category}-${id}`}
                    type='button'
                    className='btn btn-outline-secondary'
                    style={
                      {
                        '--bs-btn-padding-y': '.25rem',
                        '--bs-btn-padding-x': '.25rem',
                        '--bs-btn-font-size': '.7rem',
                      } as React.CSSProperties
                    }
                  >
                    {category}
                  </button>
                )
              })}
          </div>
          <div className='d-grid gap-2 d-md-flex justify-content-md-between mt-2'>
            <div className='gap-2 d-flex justify-content-start'>
              <button type='button' className='btn btn-danger btn-sm' onClick={openRemoveModal} title='Remove note'>
                <i className='bi bi-trash'></i>
              </button>
              <button type='button' className='btn btn-warning btn-sm' onClick={openEditModal} title='Edit note'>
                <i className='bi bi-pencil'></i>
              </button>
              <button
                type='button'
                className='btn btn-dark btn-sm'
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
      {displayModal && <SingleNoteModal note={note} handleClose={handleClose} />}
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
