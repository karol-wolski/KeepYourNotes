import { useState } from 'react'
import uuid from 'react-uuid'
import { Note } from '../notes/Notes'
interface IAddNote {
  handleSaveNote: (data: Note) => void
  handleClose: () => void
}

const AddNote = ({ handleSaveNote, handleClose }: IAddNote) => {
  const [note, setNote] = useState<Note>({
    id: uuid(),
    title: '',
    desc: '',
    createdBy: 'John Doe',
    createdDate: Date.now(),
    updatedDate: Date.now(),
    pinIt: false,
  })

  const isVisibleSendButton = !!note.title.length && !!note.desc.length

  const createNote = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({
      ...note,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className='modal fade show' tabIndex={-1} style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Add note</h5>
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
              onClick={() => handleSaveNote(note)}
              disabled={!isVisibleSendButton}
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNote
