import { BG_COLORS } from '../../constants/constants'
import trimText from '../../helpers/trimText'
import { ICategory } from '../addCategory/AddCategory'
import EditNote from '../edit-note/EditNote'
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

interface INote {
  note: NoteType
  filterNotes: (categoryId: string) => void
  categories: ICategory[]
  update: (obj: IUpdateNotesArray) => void
}

const Note = ({ note, filterNotes, categories: categoriesArray, update }: INote) => {
  const [displayFullNote, { setFalse: closeFullModal, setTrue: openFullNote }] = useBoolean(false)
  const [displayRemoveModal, { setFalse: closeRemoveModal, setTrue: openRemoveModal }] = useBoolean(false)
  const [displayEditModal, { setFalse: closeEditModal, setTrue: openEditModal }] = useBoolean(false)
  const [
    displayManageAttatchmentsModal,
    { setFalse: closeManageAttatchmentsModal, setTrue: openManageAttatchmentsModal },
  ] = useBoolean(false)
  const [method, setMethod] = useState('')

  const { data, fetchData, isLoading, statusCode } = useFetch<NoteType>()

  const { _id, title, desc, categories, pinIt, backgroundColor } = note

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
      console.log('data:', data)
      update({
        method: method,
        data: data,
      })
    }
  }, [data, statusCode])

  return (
    <>
      <div className={`card ${stylesCard.card}`} style={{ backgroundColor: bgColor?.bgColor, color: bgColor?.color }}>
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
            <h2 className='card-title'>{title}</h2>
          </div>
          <div className='card-text'>{parse(trimText(desc, 160, ' '))}</div>
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
              <button
                type='button'
                className={`btn btn-danger btn-sm ${stylesBtn.btn__danger}`}
                onClick={openRemoveModal}
                title='Remove note'
              >
                <i className='bi bi-trash'></i>
              </button>
              <button
                type='button'
                className={`btn btn-warning btn-sm ${stylesBtn.btn__primary}`}
                onClick={openEditModal}
                title='Edit note'
              >
                <i className='bi bi-pencil'></i>
              </button>
              <button
                type='button'
                className={`btn btn-dark btn-sm ${stylesBtn.btn__dark}`}
                onClick={() => handleDuplicateNote(_id)}
                title='Duplicate note'
              >
                <i className='bi bi-files'></i>
              </button>
              <button
                type='button'
                className={`btn btn-warning btn-sm ${stylesBtn.btn__primary}`}
                onClick={openManageAttatchmentsModal}
                title='Manage attachments'
              >
                <i className='bi bi-paperclip'></i>
              </button>
            </div>
            <button
              type='button'
              className={`btn btn-primary btn-sm ${stylesBtn.btn__secondary}`}
              onClick={openFullNote}
            >
              Full note
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
          title={`Remove note: ${title} `}
          btnName={isLoading ? 'Removing...' : 'Remove'}
          handleBtnEvent={() => removeNote(_id)}
          handleClose={closeRemoveModal}
          isOpen={displayRemoveModal}
        >
          <p>Are you sure you want to delete this note?</p>
        </Modal>
      )}
      {displayEditModal && (
        <EditNote
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
        />
      )}
    </>
  )
}

export default Note
