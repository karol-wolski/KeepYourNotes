import { EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import htmlToDraft from 'html-to-draftjs'
import { SetStateAction, useState, useEffect } from 'react'
import { BG_COLORS } from '../../constants/constants'
import { Category } from '../add-category/AddCategory'
import { Note } from '../notes/Notes'
import EditorWysiwyg from '../editorWysiwyg/EditorWysiwyg'
import Modal from '../modal/Modal'
import LabelInput from '../labelInput/LabelInput'
interface IEditNote {
  note: Note
  handleEditNote: (data: Note, cb?: () => void) => void
  handleClose: () => void
  categories: Category[]
  isOpen: boolean
}

const EditNote = ({ note, handleEditNote, handleClose, categories, isOpen }: IEditNote) => {
  const [editNote, setNote] = useState<Note>(note)
  const [bgColors] = useState(BG_COLORS)
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const htmlToDraftBlocks = (html: string) => {
    const blocksFromHtml = htmlToDraft(html)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }

  useEffect(() => {
    setEditorState(htmlToDraftBlocks(note.desc))
  }, [])

  const isVisibleSendButton = !!editNote.title.length && !!editNote.desc.length

  const createNote = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote(prevState => {
      return {
        ...prevState,
        updatedDate: Date.now(),
        [event.target.name]: event.target.value,
      }
    })
  }

  const toggleCategories = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isCategory = editNote.categories && editNote.categories.includes(event.target.value)
    if (isCategory) {
      editNote.categories = editNote.categories && editNote.categories.filter(item => item !== event.target.value)
    } else {
      editNote.categories?.push(event.target.value)
    }
  }

  const setBgColors = (bgColorId: number) => {
    setNote(prevState => {
      return {
        ...prevState,
        backgroundColor: prevState.backgroundColor === bgColorId ? undefined : bgColorId,
      }
    })
  }

  const updateTextDescription = (state: SetStateAction<EditorState>) => {
    setEditorState(state)

    const data = stateToHTML(editorState.getCurrentContent())
    setNote(prevState => {
      return {
        ...prevState,
        desc: data,
      }
    })
  }

  return (
    <Modal
      title='Edit note'
      btnName='Save'
      handleClose={handleClose}
      handleBtnEvent={() => handleEditNote(editNote, handleClose)}
      isDisabledBtn={!isVisibleSendButton}
      isOpen={isOpen}
    >
      <div className='mb-3'>
        <LabelInput
          id='title'
          labelText='Title'
          type='text'
          placeholder='Title'
          onChange={createNote}
          isLabelVisible={false}
          value={note.title}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlTextarea1' className='form-label visually-hidden'>
          Note
        </label>
        <EditorWysiwyg editorState={editorState} updateTextDescription={updateTextDescription} />
      </div>
      {categories &&
        categories.map(({ _id: id, name }) => {
          const isChecked = editNote.categories?.includes(id)
          return (
            <div key={id} className='form-check form-check-inline'>
              <label className='form-check-label' htmlFor={name}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id={name}
                  value={id}
                  onChange={toggleCategories}
                  defaultChecked={isChecked ? true : false}
                />
                {name}
              </label>
            </div>
          )
        })}
      <div className='mt-4'>
        <p>Set the color</p>
        <div className='d-flex'>
          {bgColors.map(bgColor => {
            return (
              <button
                key={bgColor.name}
                style={{ backgroundColor: bgColor.bgColor, height: '2rem', width: '2rem' }}
                title={bgColor.name}
                onClick={() => setBgColors(bgColor.id)}
              >
                {editNote.backgroundColor === bgColor.id && (
                  <i className='bi bi-check' style={{ color: bgColor.color }}></i>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default EditNote
