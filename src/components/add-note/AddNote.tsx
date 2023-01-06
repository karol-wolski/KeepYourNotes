import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { SetStateAction, useState } from 'react'
import uuid from 'react-uuid'
import { Category } from '../add-category/AddCategory'
import { Note } from '../notes/Notes'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import LabelInput from '../labelInput/LabelInput'
import Modal from '../modal/Modal'
import EditorWysiwyg from '../editorWysiwyg/EditorWysiwyg'

interface IAddNote {
  handleSaveNote: (data: Note) => void
  handleClose: () => void
  categories: Category[]
  isOpen: boolean
}

const AddNote = ({ handleSaveNote, handleClose, categories, isOpen }: IAddNote) => {
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

  const updateTextDescription = (state: SetStateAction<EditorState>) => {
    setEditorState(state)

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
    <Modal
      title='Add note'
      btnName='Save'
      isDisabledBtn={!isVisibleSendButton}
      handleClose={handleClose}
      handleBtnEvent={() => handleSaveNote(note)}
      isOpen={isOpen}
    >
      <div className='mb-3'>
        <LabelInput
          labelText='Title'
          type='text'
          id='title'
          onChange={createNote}
          isLabelVisible={false}
          placeholder='Note title'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='description' className='form-label visually-hidden'>
          Note
        </label>
        <EditorWysiwyg editorState={editorState} updateTextDescription={updateTextDescription} />
      </div>

      {categories &&
        categories.map(({ _id: id, name }) => {
          return (
            <div key={id} className='form-check form-check-inline'>
              <label className='form-check-label' htmlFor={name}>
                <input className='form-check-input' type='checkbox' id={name} value={id} onChange={toggleCategories} />
                {name}
              </label>
            </div>
          )
        })}
    </Modal>
  )
}

export default AddNote
