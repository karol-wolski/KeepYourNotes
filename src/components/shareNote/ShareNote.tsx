import Modal from '../modal/Modal'
import stylesBtn from '../../styles/buttons.module.scss'
import { Note } from '../notes/Notes'
import LabelInput from '../labelInput/LabelInput'
import { useRef, useState } from 'react'
import Spinner from '../spinner/Spinner'
import { isEqual } from '../../helpers/isEqual'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import useNotes from '../../hooks/useNotes'
import { useIntl } from 'react-intl'
import formValidation from '../../helpers/formValidation'
import { PERMISSIONS_ARRAY } from '../../constants/permissionsNote'

interface IShareNote {
  isOpen: boolean
  handleModalClose: () => void
  noteId: string
  refresh: () => void
}

const ShareNote = ({ isOpen, handleModalClose, noteId }: IShareNote) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const { notes, errors: errorsNotes, isLoading: isLoadingNotes, fetchData, update } = useNotes<Note>(noteId)
  const [activeBtnName, setActiveBtnName] = useState<string>('')
  const [messaage, SetMessage] = useState<{ type: ALERT_TYPE; translateId: string; msg: string } | undefined>(undefined)
  const { formatMessage } = useIntl()

  const add = async (event: React.FormEvent) => {
    event.preventDefault()

    const collaborator = {
      email: inputRef.current?.value || '',
      permission: selectRef.current?.value || 'READ',
    }
    const collaboratorsArray = notes?.collaborators || []
    const isEmailValidate = formValidation.isEmailValidate(collaborator.email)

    if (!isEmailValidate.isValidate) {
      SetMessage({
        type: ALERT_TYPE.DANGER,
        translateId: isEmailValidate.error?.translateId || '',
        msg: isEmailValidate.error?.errorMsg || '',
      })
      return
    }

    if (
      notes?.collaborators &&
      !!notes?.collaborators.find(item => item.email.toLowerCase() === collaborator.email.toLowerCase())
    ) {
      SetMessage({
        type: ALERT_TYPE.DANGER,
        translateId: 'app.collaboratorExist',
        msg: 'This collaborator has already been added.',
      })
    } else {
      collaboratorsArray.push(collaborator)
      const updatedNote = { ...notes, collaborators: collaboratorsArray }
      if (updatedNote) {
        update(updatedNote as Note)
      }
      if (inputRef.current?.value) {
        inputRef.current.value = ''
      }
      SetMessage({
        type: ALERT_TYPE.SUCCESS,
        translateId: 'app.collaboratorAdded',
        msg: 'Collaborator has been successfully added.',
      })
      const timeout = setTimeout(() => {
        SetMessage(undefined)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }

  const saveCollaborators = () => {
    if (notes) {
      fetchData(`notes/${notes._id}`, 'PATCH', notes)
    }
  }

  const removeCollaborator = async (id: string) => {
    const collaboratorsArray = notes?.collaborators?.filter(item => item._id !== id)
    const updatedNote = { ...notes, collaborators: collaboratorsArray }
    if (updatedNote) {
      update(updatedNote as Note)
    }
  }

  return (
    <Modal
      title={formatMessage({ id: 'app.collaborators', defaultMessage: 'Collaborators' })}
      btnName={
        isEqual<string>(activeBtnName, 'save')
          ? formatMessage({ id: 'app.saving', defaultMessage: 'Saving...' })
          : formatMessage({ id: 'app.save', defaultMessage: 'Save' })
      }
      handleBtnEvent={saveCollaborators}
      handleClose={handleModalClose}
      isOpen={isOpen}
    >
      <table className='table'>
        <thead>
          <tr>
            <th scope='col' className='col-5'>
              {formatMessage({ id: 'app.email', defaultMessage: 'Email' })}
            </th>
            <th scope='col' className='col-5'>
              {formatMessage({ id: 'app.permissions', defaultMessage: 'Permissions' })}
            </th>
            <th scope='col' className='col-2'>
              {formatMessage({ id: 'app.remove', defaultMessage: 'Remove' })}
            </th>
          </tr>
        </thead>
        <tbody>
          {notes?.collaborators &&
            notes.collaborators.map(({ _id: id, email, permission }) => (
              <tr key={email}>
                <td>{email}</td>
                {PERMISSIONS_ARRAY.filter(el => el.value === permission).map(el => {
                  return <td key={el.value}>{formatMessage({ id: el.translateId, defaultMessage: el.name })}</td>
                })}
                <td className='text-center'>
                  <button
                    className={`btn btn-sm btn-danger ${stylesBtn.btn__danger}`}
                    onClick={() => {
                      setActiveBtnName(`delete-${id}`)
                      removeCollaborator(id || '')
                    }}
                    aria-label={formatMessage({ id: 'app.removeCollaborator', defaultMessage: 'Remove collabolator' })}
                  >
                    {isEqual<string>(activeBtnName, `delete-${id}`) ? (
                      <Spinner
                        altText={formatMessage({ id: 'app.removing', defaultMessage: 'Removing...' })}
                        classCSS='text-white'
                      />
                    ) : (
                      <i className='bi bi-trash'></i>
                    )}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <form className='mb-2' onSubmit={add}>
        <div className='d-flex'>
          <LabelInput
            id='emailCollabolator'
            type='text'
            placeholder={formatMessage({ id: 'app.email', defaultMessage: 'Collabolator email' })}
            labelText={formatMessage({ id: 'app.addNewCollaborator', defaultMessage: 'Add new collaborator' })}
            isLabelVisible={false}
            inputRef={inputRef}
            value=''
          />
          <label htmlFor='permissions' className='mb-2'>
            {formatMessage({ id: 'app.permissions', defaultMessage: 'Permissions' })}
          </label>
          <select
            className='form-select'
            aria-label={formatMessage({
              id: 'app.selectUILangauge',
              defaultMessage: 'Select the language of the user interface',
            })}
            defaultValue={'READ'}
            name='permissions'
            id='permissions'
            ref={selectRef}
          >
            {PERMISSIONS_ARRAY.map(option => (
              <option key={option.id} value={option.value}>
                {formatMessage({ id: option.translateId, defaultMessage: option.name })}
              </option>
            ))}
          </select>
          <button type='submit' className={`btn btn-primary ${stylesBtn.btn__primary}`}>
            Add
          </button>
        </div>
        {messaage && (
          <Alert
            type={messaage.type}
            text={formatMessage({ id: messaage.translateId, defaultMessage: messaage.msg })}
          />
        )}
      </form>

      {isLoadingNotes && <p>{formatMessage({ id: 'app.loading', defaultMessage: 'Loading...' })}</p>}
      {errorsNotes && (
        <p>
          {formatMessage({ id: 'app.cannotLoadCollaborators', defaultMessage: 'We cannot load your collaborators.' })}
        </p>
      )}
    </Modal>
  )
}

export default ShareNote
