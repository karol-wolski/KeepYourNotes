import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { SetStateAction, useState } from 'react'
import uuid from 'react-uuid'
import { Category } from '../add-category/AddCategory'
import { Note } from '../notes/Notes'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
interface IAddNote {
  handleSaveNote: (data: Note) => void
  handleClose: () => void
  categories: Category[]
}

const AddNote = ({ handleSaveNote, handleClose, categories }: IAddNote) => {
  const [note, setNote] = useState<Note>({
    _id: uuid(),
    title: '',
    desc: '',
    createdBy: 'John Doe',
    createdDate: Date.now(),
    updatedDate: Date.now(),
    pinIt: false,
    categories: [],
  })

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const updateTextDescription = async (state: SetStateAction<EditorState>) => {
    await setEditorState(state)

    const data = stateToHTML(editorState.getCurrentContent())
    setNote({
      ...note,
      desc: data,
    })
  }

  const isVisibleSendButton = !!note.title.length && !!note.desc.length

  const createNote = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({
      ...note,
      [event.target.name]: event.target.value,
    })
  }

  const toggleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isCategory = note.categories && note.categories.includes(e.target.value)
    if (isCategory) {
      note.categories = note.categories && note.categories.filter(item => item !== e.target.value)
    } else {
      note.categories?.push(e.target.value)
    }
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
              <label htmlFor='title' className='form-label visually-hidden'>
                Title
              </label>
              <input
                type='text'
                className='form-control'
                id='title'
                placeholder='Title'
                name='title'
                onChange={createNote}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label visually-hidden'>
                Note
              </label>
              <Editor
                editorState={editorState}
                editorClassName='wysywig-editor'
                onEditorStateChange={updateTextDescription}
              />
            </div>

            {categories &&
              categories.map(({ id, name }) => {
                return (
                  <div key={id} className='form-check form-check-inline'>
                    <label className='form-check-label' htmlFor={name}>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id={name}
                        value={id}
                        onChange={toggleCategories}
                      />
                      {name}
                    </label>
                  </div>
                )
              })}
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
