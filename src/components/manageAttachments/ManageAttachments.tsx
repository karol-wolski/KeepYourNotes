import Modal from '../modal/Modal'
import stylesBtn from '../../styles/buttons.module.scss'
import { Attachment, Note } from '../notes/Notes'
import LabelInput from '../labelInput/LabelInput'
import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Spinner from '../spinner/Spinner'
import { isEqual } from '../../helpers/isEqual'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import useNotes from '../../hooks/useNotes'
import { useIntl } from 'react-intl'

interface IManageAttachments {
  isOpen: boolean
  handleModalClose: () => void
  noteId: string
  refresh: () => void
}

const ManageAttachments = ({ isOpen, handleModalClose, noteId, refresh: refreshNotes }: IManageAttachments) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { notes, errors: errorsNotes, isLoading: isLoadingNotes, refresh } = useNotes<Note>(noteId)
  const { data, errors, isLoading, fetchData, statusCode } = useFetch<Attachment>()
  const [activeBtnName, setActiveBtnName] = useState<string>('')

  const { formatMessage } = useIntl()

  useEffect(() => {
    if (statusCode === 201) {
      formRef.current?.reset()
    }
    if (statusCode === 200 || statusCode === 201) {
      refresh()
    }
  }, [data, statusCode])

  const saveAttachment = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData(formRef.current as HTMLFormElement)
    data.append('noteId', noteId)
    setActiveBtnName('save')
    await fetchData('attachment', 'POST_FORM_DATA', data)
    refreshNotes()
  }

  const removeAttachment = async (id: string) => {
    await fetchData(`attachment/${id}`, 'DELETE')
    refreshNotes()
  }

  return (
    <Modal
      title={formatMessage({ id: 'app.manageAttachments', defaultMessage: 'Manage attachments' })}
      btnName={
        isLoading && isEqual<string>(activeBtnName, 'save')
          ? formatMessage({ id: 'app.saving', defaultMessage: 'Saving...' })
          : formatMessage({ id: 'app.save', defaultMessage: 'Save' })
      }
      handleBtnEvent={saveAttachment}
      handleClose={handleModalClose}
      isOpen={isOpen}
    >
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>{formatMessage({ id: 'app.category', defaultMessage: 'Category' })}</th>
            <th scope='col'>{formatMessage({ id: 'app.open', defaultMessage: 'Open' })}</th>
            <th scope='col'>{formatMessage({ id: 'app.remove', defaultMessage: 'Remove' })}</th>
          </tr>
        </thead>
        <tbody>
          {notes?.attachments &&
            notes.attachments.map(({ _id: id, name, path }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  <a
                    href={path}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`btn btn-sm btn-warning ${stylesBtn.btn__primary} text-white`}
                  >
                    <i className='bi bi-eye'></i>
                  </a>
                </td>
                <td>
                  <button
                    className={`btn btn-sm btn-danger ${stylesBtn.btn__danger}`}
                    onClick={() => {
                      setActiveBtnName(`delete-${id}`)
                      removeAttachment(id)
                    }}
                    aria-label={formatMessage({ id: 'app.removeAttachment', defaultMessage: 'Remove attachment' })}
                  >
                    {isLoading && isEqual<string>(activeBtnName, `delete-${id}`) ? (
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
      {isLoadingNotes && <p>{formatMessage({ id: 'app.loading', defaultMessage: 'Loading...' })}</p>}
      {errorsNotes && (
        <p>{formatMessage({ id: 'app.cannotLoadAttachments', defaultMessage: 'We cannot load your attachments.' })}</p>
      )}
      <form ref={formRef}>
        <LabelInput
          labelText={formatMessage({
            id: 'app.addFile',
            defaultMessage: 'Add file',
          })}
          type='file'
          id='files'
          isLabelVisible={false}
          placeholder={formatMessage({
            id: 'app.addFile',
            defaultMessage: 'Add file',
          })}
          multiple={false}
        />
      </form>
      {errors && <Alert text={errors} type={ALERT_TYPE.DANGER} />}
    </Modal>
  )
}

export default ManageAttachments
