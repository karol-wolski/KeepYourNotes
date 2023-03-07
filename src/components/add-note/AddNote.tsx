import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { SetStateAction, useState, useRef, useEffect } from 'react'
import { ICategory } from '../addCategory/AddCategory'
import { AddNote as AddNoteType, Note } from '../notes/Notes'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import LabelInput from '../labelInput/LabelInput'
import Modal from '../modal/Modal'
import EditorWysiwyg from '../editorWysiwyg/EditorWysiwyg'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import useFetch from '../../hooks/useFetch'
import { IUpdateNotesArray } from '../../pages/Notes'
import { useIntl } from 'react-intl'

interface IAddNote {
  update: (obj: IUpdateNotesArray) => void
  handleClose: () => void
  categories: ICategory[]
  isOpen: boolean
}

const AddNote = ({ update, handleClose, categories, isOpen }: IAddNote) => {
  const { data, errors, isLoading, fetchData, statusCode } = useFetch<Note>()
  const formRef = useRef<HTMLFormElement>(null)
  const [note, setNote] = useState<AddNoteType>({
    title: '',
    desc: '',
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

  const submitNote = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(formRef.current as HTMLFormElement)
    data.append('desc', note.desc)
    data.append('pinIt', JSON.stringify(note.pinIt))
    if (note.categories) data.append('categories', JSON.stringify(note.categories))
    fetchData('notes', 'POST_FORM_DATA', data)
  }

  useEffect(() => {
    if (statusCode === 201 && data) {
      update({
        method: 'POST',
        data: data,
      })
    }
  }, [data, statusCode])

  const { formatMessage } = useIntl()

  return (
    <Modal
      title={formatMessage({ id: 'app.addNote', defaultMessage: 'Add note' })}
      btnName={
        isLoading
          ? formatMessage({ id: 'app.saving', defaultMessage: 'Saving...' })
          : formatMessage({ id: 'app.save', defaultMessage: 'Save' })
      }
      isDisabledBtn={!isVisibleSendButton}
      handleClose={handleClose}
      isOpen={isOpen}
      btnSubmitType='submit'
      handleBtnEvent={submitNote}
    >
      <form ref={formRef}>
        <div className='mb-3'>
          <LabelInput
            labelText={formatMessage({ id: 'app.title', defaultMessage: 'Title' })}
            type='text'
            id='title'
            onChange={createNote}
            isLabelVisible={false}
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

        {categories &&
          categories.map(({ _id: id, name }) => {
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
        {errors && <Alert type={ALERT_TYPE.DANGER} text={errors} />}
      </form>
    </Modal>
  )
}

export default AddNote
