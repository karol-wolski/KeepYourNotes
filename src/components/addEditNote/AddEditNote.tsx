import { ContentState, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { SetStateAction, useState, useRef, useEffect, KeyboardEvent } from 'react'
import { ICategory } from '../addCategory/AddCategory'
import { CheckListElement, NewNote, Note } from '../notes/Notes'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import LabelInput from '../labelInput/LabelInput'
import Modal from '../modal/Modal'
import EditorWysiwyg from '../editorWysiwyg/EditorWysiwyg'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import useFetch from '../../hooks/useFetch'
import { IUpdateNotesArray } from '../../pages/Notes'
import { useIntl } from 'react-intl'
import { BG_COLORS } from '../../constants/constants'
import htmlToDraft from 'html-to-draftjs'
import stylesBtn from '../../styles/buttons.module.scss'

interface IAddEditNote {
  update: (obj: IUpdateNotesArray) => void
  handleClose: () => void
  categories: ICategory[]
  isOpen: boolean
  note?: Note
}

const AddEditNote = ({ note: editNote, update, handleClose, categories, isOpen }: IAddEditNote) => {
  const { data, errors, isLoading, fetchData, statusCode } = useFetch<Note>()
  const formRef = useRef<HTMLFormElement>(null)
  const checkListInputRef = useRef<HTMLInputElement>(null)
  const isEditMode = !!editNote
  const initialNewNote: NewNote = {
    title: '',
    desc: '',
    pinIt: false,
    categories: [],
    list: [],
  }
  const initialState: Note | NewNote = isEditMode ? editNote : initialNewNote
  const [note, setNote] = useState<Note | NewNote>(initialState)

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const htmlToDraftBlocks = (html: string) => {
    const blocksFromHtml = htmlToDraft(html)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }

  const updateTextDescription = (state: SetStateAction<EditorState>) => {
    setEditorState(state)

    const data = stateToHTML(editorState.getCurrentContent())
    setNote(note => {
      return {
        ...note,
        desc: data,
      }
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

  const toggleChecklistItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findItem = note.list.find(item => item.value === e.target.id)

    if (findItem) {
      const updateList = note.list.map(item => {
        if (item.id === findItem.id) {
          return {
            ...item,
            checked: !item.checked,
          }
        }
        return item
      })
      setNote({
        ...note,
        list: [...updateList],
      })
    }
  }

  const removeChecklistItem = (id: string) => {
    const filterList = note.list.filter(item => item.id !== id)
    setNote({
      ...note,
      list: filterList,
    })
  }

  const setBgColors = (bgColorId: number) => {
    setNote(prevState => {
      return {
        ...prevState,
        backgroundColor: prevState.backgroundColor === bgColorId ? undefined : bgColorId,
      }
    })
  }

  const submitNewNote = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(formRef.current as HTMLFormElement)
    data.append('desc', note.desc)
    data.append('pinIt', JSON.stringify(note.pinIt))
    if (note.categories) data.append('categories', JSON.stringify(note.categories))
    if (note.backgroundColor) data.append('backgroundColor', JSON.stringify(note.backgroundColor))
    if (note.list) data.append('list', JSON.stringify(note.list))
    fetchData('notes', 'POST_FORM_DATA', data)
  }
  const addChecklistElement = () => {
    const inputValue = checkListInputRef.current?.value
    if (!inputValue?.length) return false

    const newChecklistItem: CheckListElement = {
      id: Math.random().toString(),
      value: inputValue,
      checked: false,
    }

    setNote({
      ...note,
      list: [...note.list, newChecklistItem],
    })

    if (inputValue) {
      checkListInputRef.current.value = ''
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addChecklistElement()
    }
  }

  const submitEditNote = (note: Note) => fetchData(`notes/${note._id}`, 'PATCH', note)

  const submitNote = (e: React.FormEvent) => (isEditMode ? submitEditNote(note as Note) : submitNewNote(e))

  useEffect(() => {
    setEditorState(htmlToDraftBlocks(note.desc))
  }, [])

  useEffect(() => {
    if (statusCode === 201 && data) {
      update({
        method: 'POST',
        data: data,
      })
      handleClose()
    }

    if (statusCode === 200 && data) {
      update({
        method: 'PATCH',
        data: data,
      })
    }
  }, [data, statusCode])

  const { formatMessage } = useIntl()

  return (
    <Modal
      title={
        isEditMode
          ? formatMessage({ id: 'app.editNote', defaultMessage: 'Edit note' })
          : formatMessage({ id: 'app.addNote', defaultMessage: 'Add note' })
      }
      btnName={
        isLoading
          ? formatMessage({ id: 'app.saving', defaultMessage: 'Saving...' })
          : formatMessage({ id: 'app.save', defaultMessage: 'Save' })
      }
      isDisabledBtn={!isVisibleSendButton}
      handleClose={handleClose}
      isOpen={isOpen}
      btnSubmitType='submit'
      handleBtnEvent={e => submitNote(e)}
    >
      <form ref={formRef}>
        <div className='mb-3'>
          <LabelInput
            labelText={formatMessage({ id: 'app.title', defaultMessage: 'Title' })}
            type='text'
            id='title'
            onChange={createNote}
            isLabelVisible={false}
            value={note.title}
            placeholder={formatMessage({ id: 'app.titleNote', defaultMessage: 'Note title' })}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label visually-hidden'>
            {formatMessage({ id: 'app.note', defaultMessage: 'Note' })}
          </label>
          <EditorWysiwyg editorState={editorState} updateTextDescription={updateTextDescription} />
        </div>

        <div className='mb-3'>
          <p>{formatMessage({ id: 'app.addChecklist', defaultMessage: 'Add checklist' })}</p>
          {note.list.map(({ id, value, checked }) => {
            return (
              <div className='d-flex align-items-center justify-content-between' key={id}>
                <label htmlFor={value} className='d-block mb-2'>
                  <input
                    type='checkbox'
                    name={id}
                    id={value}
                    className='form-check-input'
                    onChange={toggleChecklistItem}
                    defaultChecked={checked}
                  />{' '}
                  {value}
                </label>
                <button
                  type='button'
                  className={`btn btn-danger btn-sm ${stylesBtn.btn__danger}`}
                  onClick={() => removeChecklistItem(id)}
                  title={formatMessage({ id: 'app.removeChecklistItem', defaultMessage: 'Remove checklist item' })}
                >
                  <i className='bi bi-trash'></i>
                </button>
              </div>
            )
          })}
          <div className='d-block mt-3'>
            <div className='d-flex'>
              <LabelInput
                labelText={formatMessage({ id: 'app.addChecklist', defaultMessage: 'Add checklist' })}
                type='text'
                id='checklist'
                isLabelVisible={false}
                placeholder={formatMessage({ id: 'app.addChecklistItem', defaultMessage: 'Add checklist item' })}
                inputRef={checkListInputRef}
                onKeyUp={handleKeyDown}
              />
              <button type='button' onClick={addChecklistElement}>
                Add
              </button>
            </div>
          </div>
        </div>

        {!isEditMode && (
          <div className='mb-3'>
            <LabelInput
              labelText='Add files'
              type='file'
              id='files'
              onChange={createNote}
              isLabelVisible={false}
              placeholder={formatMessage({ id: 'app.addFile', defaultMessage: 'Add file' })}
              multiple={true}
            />
          </div>
        )}

        <div className='mt-4'>
          <p>{formatMessage({ id: 'app.categories', defaultMessage: 'Set the category' })}</p>
          {categories &&
            categories.map(({ _id: id, name }) => {
              const isChecked = note.categories?.includes(id)
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
        </div>

        <div className='mt-4'>
          <p>{formatMessage({ id: 'app.setColor', defaultMessage: 'Set the color' })}</p>
          <div className='d-flex'>
            {BG_COLORS.map(bgColor => {
              return (
                <button
                  key={bgColor.name}
                  style={{ backgroundColor: bgColor.bgColor, height: '2rem', width: '2rem' }}
                  title={bgColor.name}
                  onClick={() => setBgColors(bgColor.id)}
                  type='button'
                >
                  {note.backgroundColor === bgColor.id && (
                    <i className='bi bi-check' style={{ color: bgColor.color }}></i>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        {errors && <Alert type={ALERT_TYPE.DANGER} text={errors} />}
      </form>
    </Modal>
  )
}

export default AddEditNote
