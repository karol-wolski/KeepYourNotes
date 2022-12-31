import { EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import htmlToDraft from 'html-to-draftjs'
import { SetStateAction, useState, useEffect } from 'react'
import { BG_COLORS } from '../../constants/constants'
import { Category } from '../add-category/AddCategory'
import { Note } from '../notes/Notes'
import EditorWysiwyg from '../editorWysiwyg/EditorWysiwyg'
interface IEditNote {
  note: Note
  handleEditNote: (data: Note, cb?: () => void) => void
  handleClose: () => void
  categories: Category[]
}

const EditNote = ({ note, handleEditNote, handleClose, categories }: IEditNote) => {
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
        backgroundColor: bgColorId,
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
              <label htmlFor='exampleFormControlInput1' className='form-label visually-hidden'>
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
              <>
                {bgColors.map(bgColor => {
                  return (
                    <button
                      key={bgColor.name}
                      style={{ backgroundColor: bgColor.bgColor, height: '2rem', width: '2rem' }}
                      title={bgColor.name}
                      onClick={() => setBgColors(bgColor.id)}
                    ></button>
                  )
                })}
              </>
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
