import { useState } from 'react'
import { Note } from '../notes/Notes'
interface IEditNote {
  note: Note
  handleEditNote: (data: Note, cb: () => void) => void
  handleClose: () => void
}

const EditNote = ({ note, handleEditNote, handleClose }: IEditNote) => {
  const [editNote, setNote] = useState<Note>(note)

  const isVisibleSendButton = !!editNote.title.length && !!editNote.desc.length

  const createNote = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({
      ...note,
      updatedDate: Date.now(),
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className='modal fade show' tabIndex={-1} style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Edit note</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={handleClose}
            ></button>
          </div>
          <div className='modal-body'>
            <div className='mb-3'>
              <label htmlFor='exampleFormControlInput1' className='form-label'>
                Title
              </label>
              <input
                type='text'
                className='form-control'
                id='exampleFormControlInput1'
                placeholder='Title'
                name='title'
                value={editNote.title}
                onChange={createNote}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleFormControlTextarea1' className='form-label'>
                Note
              </label>
              <textarea
                className='form-control'
                id='exampleFormControlTextarea1'
                rows={3}
                name='desc'
                value={editNote.desc}
                onChange={createNote}
              ></textarea>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={handleClose}>
              Close
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => handleEditNote(editNote, handleClose)}
              disabled={!isVisibleSendButton}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditNote
