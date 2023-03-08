import { EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import htmlToDraft from 'html-to-draftjs'
import { SetStateAction, useState, useEffect } from 'react'
import { BG_COLORS } from '../../constants/constants'
import { ICategory } from '../addCategory/AddCategory'
import { Note } from '../notes/Notes'
import EditorWysiwyg from '../editorWysiwyg/EditorWysiwyg'
import Modal from '../modal/Modal'
import LabelInput from '../labelInput/LabelInput'
import useFetch from '../../hooks/useFetch'
import { IUpdateNotesArray } from '../../pages/Notes'
import { useIntl } from 'react-intl'
interface IEditNote {
  note: Note
  handleClose: () => void
  categories: ICategory[]
  isOpen: boolean
  update: (obj: IUpdateNotesArray) => void
}

const EditNote = ({ note, handleClose, categories, isOpen, update }: IEditNote) => {
  const { data, isLoading, fetchData, statusCode } = useFetch<Note>()
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

  useEffect(() => {
    if (statusCode === 200 && data) {
      console.log('xxx: ', data)
      update({
        method: 'PATCH',
        data: data,
      })
    }
  }, [data, statusCode])

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
    const isCategory = editNote.categories?.includes(event.target.value)
    if (isCategory) {
      editNote.categories = editNote.categories?.filter(item => item !== event.target.value)
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

  const saveNote = (note: Note) => fetchData(`notes/${note._id}`, 'PATCH', note)

  const { formatMessage } = useIntl()

  return (
    <Modal
      title={formatMessage({ id: 'app.editNote', defaultMessage: 'Edit note' })}
      btnName={
        isLoading
          ? formatMessage({ id: 'app.saving', defaultMessage: 'Saving...' })
          : formatMessage({ id: 'app.save', defaultMessage: 'Save' })
      }
      handleClose={handleClose}
      handleBtnEvent={() => saveNote(editNote)}
      isDisabledBtn={!isVisibleSendButton}
      isOpen={isOpen}
    >
      <div className='mb-3'>
        <LabelInput
          id='title'
          labelText={formatMessage({ id: 'app.title', defaultMessage: 'Title' })}
          type='text'
          placeholder={formatMessage({ id: 'app.title', defaultMessage: 'Title' })}
          onChange={createNote}
          isLabelVisible={false}
          value={note.title}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlTextarea1' className='form-label visually-hidden'>
          {formatMessage({ id: 'app.note', defaultMessage: 'Note' })}
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
                  defaultChecked={isChecked}
                />
                {name}
              </label>
            </div>
          )
        })}
      <div className='mt-4'>
        <p>{formatMessage({ id: 'app.setColor', defaultMessage: 'Set the color' })}</p>
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
