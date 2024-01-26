import { BG_COLORS } from '../../constants/constants'
import trimText from '../../helpers/trimText'
import { ICategory } from '../addCategory/AddCategory'
import Modal from '../modal/Modal'
import { Note as NoteType } from '../notes/Notes'
import FullNote from '../fullNote/FullNote'
import parse from 'html-react-parser'
import stylesBtn from '../../styles/buttons.module.scss'
import stylesCard from './Note.module.scss'
import useBoolean from '../../hooks/useBoolean'
import ManageAttachments from '../manageAttachments/ManageAttachments'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { IUpdateNotesArray } from '../../pages/Notes'
import { FormattedMessage, useIntl } from 'react-intl'
import AddEditNote from '../addEditNote/AddEditNote'
import ShareNote from '../shareNote/ShareNote'
import useUsers from '../../hooks/useUsers'
import { PERMISSIONS } from '../../constants/permissionsNote'

interface INote {
  note: NoteType
  filterNotes: (categoryId: string) => void
  categories: ICategory[]
  update: (obj: IUpdateNotesArray) => void
  refresh: () => void
}

const Note = ({ note, filterNotes, categories: categoriesArray, update, refresh }: INote) => {
  const [displayFullNote, { setFalse: closeFullModal, setTrue: openFullNote }] = useBoolean(false)
  const [displayRemoveModal, { setFalse: closeRemoveModal, setTrue: openRemoveModal }] = useBoolean(false)
  const [displayEditModal, { setFalse: closeEditModal, setTrue: openEditModal }] = useBoolean(false)
  const [
    displayManageAttatchmentsModal,
    { setFalse: closeManageAttatchmentsModal, setTrue: openManageAttatchmentsModal },
  ] = useBoolean(false)
  const [displayShareNote, { setFalse: closeShareNoteModal, setTrue: openShareNoteModal }] = useBoolean(false)
  const [method, setMethod] = useState('')
  const getUser = useUsers()

  const { data, fetchData, isLoading, statusCode } = useFetch<NoteType>()

  const { _id, title, desc, categories, pinIt, backgroundColor, numberOfAttachments, collaborators, createdBy } = note

  const collaborator = collaborators?.filter(el => el.email === getUser?.email)[0]?.permission
  const isAuthor = getUser?._id === createdBy
  const bgColor = BG_COLORS.find(bg => bg.id === backgroundColor)

  const pinItOnChange = () => {
    const editNote = {
      ...note,
      pinIt: !note.pinIt,
    }
    fetchData(`notes/${note._id}`, 'PATCH', editNote)
    setMethod('PATCH')
  }

  const removeNote = (noteId: string) => {
    fetchData(`notes/${noteId}`, 'DELETE')
    setMethod('DELETE')
  }

  const handleDuplicateNote = (noteId: string) => {
    fetchData(`notes/duplicate/${noteId}`, 'GET')
    setMethod('POST')
  }

  useEffect(() => {
    if ((statusCode === 200 || statusCode === 201) && data) {
      update({
        method: method,
        data: data,
      })
    }
  }, [data, statusCode])

  const { formatMessage } = useIntl()

  return (
    <>
      <div
        className={`card ${stylesCard.card} mb-3`}
        style={{ backgroundColor: bgColor?.bgColor, color: bgColor?.color }}
      >
        <div className='card-body'>
          <div className='position-relative'>
            <div className='position-absolute top-0 end-0'>
              <button
                type='button'
                className={`btn btn-sm btn-light ${stylesCard.card__pin}`}
                onClick={() => pinItOnChange()}
              >
                <i className={pinIt ? 'bi bi-pin-angle-fill' : 'bi bi-pin-angle'}></i>
              </button>
            </div>
            {collaborator ? <div className='text-center bg-info text-dark fw-bold'>shared for you</div> : ''}
            <h2 className='card-title'>{title}</h2>
            {!!numberOfAttachments && (
              <span className='text-decoration-underline'>
                <i className='bi bi-paperclip'></i>
                <FormattedMessage
                  id={'app.attachmentsCount'}
                  values={{ count: numberOfAttachments }}
                  defaultMessage={'{count, plural, =0 {# attachemnts} one {# attachemnt} other {# attachemnts}}'}
                />
              </span>
            )}
          </div>
          {desc && <div className='card-text'>{parse(trimText(desc, 160, ' '))}</div>}
          <div className='d-flex gap-2 justify-start'>
            {categories &&
              categoriesArray &&
              categoriesArray
                .filter(categoryObj => categories.includes(categoryObj._id))
                .map(({ _id: id, name }: { _id: string; name: string }) => {
                  return (
                    <button
                      key={`${name}-${id}`}
                      type='button'
                      className='btn btn-outline-secondary'
                      style={
                        {
                          '--bs-btn-padding-y': '.25rem',
                          '--bs-btn-padding-x': '.25rem',
                          '--bs-btn-font-size': '.7rem',
                        } as React.CSSProperties
                      }
                      onClick={() => filterNotes(id)}
                    >
                      {name}
                    </button>
                  )
                })}
          </div>
          <div className='d-grid gap-2 d-md-flex justify-content-md-between mt-2 align-items-center'>
            <div className='gap-1 d-flex justify-content-start'>
              {(isAuthor || collaborator === PERMISSIONS.FULL_CONTROL) && (
                <button
                  type='button'
                  className={`btn btn-danger btn-sm ${stylesBtn.btn__danger}`}
                  onClick={openRemoveModal}
                  title={formatMessage({ id: 'app.removeNote', defaultMessage: 'Remove note' })}
                >
                  <i className='bi bi-trash'></i>
                </button>
              )}
              {(isAuthor || collaborator === PERMISSIONS.READ_WRITE) && (
                <button
                  type='button'
                  className={`btn btn-warning btn-sm ${stylesBtn.btn__primary}`}
                  onClick={openEditModal}
                  title={formatMessage({ id: 'app.editNote', defaultMessage: 'Edit note' })}
                >
                  <i className='bi bi-pencil'></i>
                </button>
              )}
              <button
                type='button'
                className={`btn btn-dark btn-sm ${stylesBtn.btn__dark}`}
                onClick={() => handleDuplicateNote(_id)}
                title={formatMessage({ id: 'app.duplicateNote', defaultMessage: 'Duplicate note' })}
              >
                <i className='bi bi-files'></i>
              </button>
              {(isAuthor || collaborator === PERMISSIONS.READ_WRITE) && (
                <button
                  type='button'
                  className={`btn btn-warning btn-sm ${stylesBtn.btn__primary}`}
                  onClick={openManageAttatchmentsModal}
                  title={formatMessage({ id: 'app.manageAttachments', defaultMessage: 'Manage attachments' })}
                >
                  <i className='bi bi-paperclip'></i>
                </button>
              )}
              {(isAuthor || collaborator === PERMISSIONS.FULL_CONTROL) && (
                <button
                  type='button'
                  className={`btn btn-warning btn-sm ${stylesBtn.btn__primary}`}
                  onClick={openShareNoteModal}
                  title={formatMessage({ id: 'app.manageAttachments', defaultMessage: 'Share note' })}
                >
                  <i className='bi bi-share'></i>
                </button>
              )}
            </div>
            <button
              type='button'
              className={`btn btn-primary btn-sm ${stylesBtn.btn__secondary}`}
              onClick={openFullNote}
            >
              {formatMessage({ id: 'app.fullNote', defaultMessage: 'Full note' })}
            </button>
          </div>
        </div>
      </div>
      {displayFullNote && (
        <FullNote
          noteId={note._id}
          handleClose={closeFullModal}
          filterNotes={filterNotes}
          categories={categoriesArray}
          isOpen={displayFullNote}
        />
      )}
      {displayRemoveModal && (
        <Modal
          title={`${formatMessage({ id: 'app.removeNote', defaultMessage: 'Remove note: ' })}: ${title} `}
          btnName={
            isLoading
              ? formatMessage({ id: 'app.removing', defaultMessage: 'Removing...' })
              : formatMessage({ id: 'app.remove', defaultMessage: 'Remove' })
          }
          handleBtnEvent={() => removeNote(_id)}
          handleClose={closeRemoveModal}
          isOpen={displayRemoveModal}
        >
          <p>
            {formatMessage({
              id: 'app.removeNoteQuestion',
              defaultMessage: 'Are you sure you want to delete this note?',
            })}
          </p>
        </Modal>
      )}
      {displayEditModal && (
        <AddEditNote
          note={note}
          handleClose={closeEditModal}
          categories={categoriesArray}
          isOpen={displayEditModal}
          update={update}
        />
      )}
      {displayManageAttatchmentsModal && note.attachments && (
        <ManageAttachments
          handleModalClose={closeManageAttatchmentsModal}
          isOpen={displayManageAttatchmentsModal}
          noteId={_id}
          refresh={refresh}
        />
      )}
      {displayShareNote && (
        <ShareNote handleModalClose={closeShareNoteModal} isOpen={displayShareNote} noteId={_id} refresh={refresh} />
      )}
    </>
  )
}

export default Note
