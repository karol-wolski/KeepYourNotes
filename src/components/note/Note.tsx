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
import useNotes from '../../hooks/useNotes'
import useBoolean from '../../hooks/useBoolean'
import ManageAttachments from '../manageAttachments/ManageAttachments'

interface INote {
  note: NoteType
  handleRemoveNote: (id: string) => void
  handleDuplicateNote: (id: string) => void
  handleEditNote: (note: NoteType, cb?: () => void) => void
  filterNotes: (categoryId: string) => void
  categories: ICategory[]
  handleDeleteAttachment: (attachmentId: string) => void
  handleSaveAttachment: (data: FormData, cb: () => void) => void
}

const Note = ({
  note,
  handleRemoveNote,
  handleDuplicateNote,
  handleEditNote,
  filterNotes,
  categories: categoriesArray,
  handleDeleteAttachment,
  handleSaveAttachment,
}: INote) => {
  const [displayModal, { setFalse: handleClose, setTrue: openModal }] = useBoolean(false)
  const [displayRemoveModal, { setFalse: closeRemoveModal, setTrue: openRemoveModal }] = useBoolean(false)
  const [displayEditModal, { setFalse: closeEditModal, setTrue: openEditModal }] = useBoolean(false)
  const [
    displayManageAttatchmentsModal,
    { setFalse: closeManageAttatchmentsModal, setTrue: openManageAttatchmentsModal },
  ] = useBoolean(false)

  const { notes: singleNote, isLoading, refresh } = useNotes(note._id)
  const { _id, title, desc, categories, pinIt, backgroundColor } = note

  const bgColor = !isLoading ? BG_COLORS.find(bg => bg.id === backgroundColor) : null

  const pinItOnChange = () => {
    const editNote = {
      ...note,
      pinIt: !note.pinIt,
    }
    handleEditNote(editNote)
  }

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
            <button type='button' className={`btn btn-primary btn-sm ${stylesBtn.btn__secondary}`} onClick={openModal}>
              Full note
            </button>
          </div>
        </div>
      </div>
      {displayModal && !isLoading && (
        <FullNote
          note={singleNote[0]}
          handleClose={handleClose}
          filterNotes={filterNotes}
          categories={categoriesArray}
          isOpen={displayModal}
        />
      )}
      {displayRemoveModal && (
        <Modal
          title={`Remove note: ${title} `}
          btnName='Remove'
          handleBtnEvent={() => handleRemoveNote(_id)}
          handleClose={closeRemoveModal}
          isOpen={displayRemoveModal}
        >
          <p>Are you sure you want to delete this note?</p>
        </Modal>
      )}
      {displayEditModal && !isLoading && (
        <EditNote
          note={singleNote[0]}
          handleClose={closeEditModal}
          handleEditNote={handleEditNote}
          categories={categoriesArray}
          isOpen={displayEditModal}
        />
      )}
      {displayManageAttatchmentsModal && singleNote[0].attachments && (
        <ManageAttachments
          attachments={singleNote[0].attachments}
          handleModalClose={closeManageAttatchmentsModal}
          isOpen={displayManageAttatchmentsModal}
          handleRemoveAttachment={handleDeleteAttachment}
          handleSaveAttachment={handleSaveAttachment}
          noteId={_id}
          refreshNote={refresh}
        />
      )}
    </>
  )
}

export default Note
