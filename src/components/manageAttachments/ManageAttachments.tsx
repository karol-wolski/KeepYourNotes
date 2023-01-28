import Modal from '../modal/Modal'
import stylesBtn from '../../styles/buttons.module.scss'
import { Attachment } from '../notes/Notes'
import LabelInput from '../labelInput/LabelInput'
import { useRef } from 'react'
import useBoolean from '../../hooks/useBoolean'

interface IManageAttachments {
  isOpen: boolean
  handleModalClose: () => void
  handleRemoveAttachment: (attachmentId: string) => void
  handleSaveAttachment: (data: FormData, cb: () => void) => void
  attachments: Attachment[]
  noteId: string
  refreshNote: () => void
}

const ManageAttachments = ({
  isOpen,
  handleModalClose,
  attachments,
  handleRemoveAttachment,
  handleSaveAttachment,
  noteId,
  refreshNote,
}: IManageAttachments) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSaving, { toggle }] = useBoolean(false)

  const saveAttachment = async (e: React.FormEvent) => {
    e.preventDefault()
    toggle()
    const data = new FormData(formRef.current as HTMLFormElement)
    data.append('noteId', noteId)

    const cb = () => {
      refreshNote()
      toggle()
    }

    handleSaveAttachment(data, cb)
  }

  const removeAttachment = (id: string) => {
    handleRemoveAttachment(id)
    refreshNote()
  }

  return (
    <Modal
      title='Manage Attachments'
      btnName={isSaving ? 'Saving...' : 'Save'}
      handleBtnEvent={saveAttachment}
      handleClose={handleModalClose}
      isOpen={isOpen}
    >
      {!!attachments.length && (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Category</th>
              <th scope='col'>Open</th>
              <th scope='col'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {attachments.map(({ _id: id, name, path }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  <a
                    href={path}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`btn btn-sm btn-warning ${stylesBtn.btn__primary}`}
                  >
                    <i className='bi bi-check2'></i>
                  </a>
                </td>
                <td>
                  <button
                    className={`btn btn-sm btn-danger ${stylesBtn.btn__danger}`}
                    onClick={() => removeAttachment(id)}
                  >
                    <i className='bi bi-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <form ref={formRef}>
        <LabelInput
          labelText='Add files'
          type='file'
          id='files'
          isLabelVisible={false}
          placeholder='Add file'
          multiple={true}
        />
      </form>
    </Modal>
  )
}

export default ManageAttachments
