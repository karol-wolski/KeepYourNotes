import { useState } from 'react'
import { ICategory } from '../addCategory/AddCategory'
import { Attachment, Note } from '../notes/Notes'
import parse from 'html-react-parser'
import Modal from '../modal/Modal'
import { copyToClipboard } from '../../helpers/copyToClipboard'
import stylesNote from './FullNote.module.scss'
import stylesBtn from '../../styles/buttons.module.scss'
import useNotes from '../../hooks/useNotes'
import { useIntl } from 'react-intl'

interface IModal {
  noteId: string
  handleClose: () => void
  filterNotes: (categoryId: string) => void
  categories: ICategory[]
  isOpen: boolean
}

const FullNote = ({ noteId, handleClose, filterNotes, categories: categoriesArray, isOpen }: IModal) => {
  const { notes, errors, isLoading } = useNotes<Note>(noteId)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const handleSetIsCopied = () => setIsCopied(true)
  const { formatMessage } = useIntl()
  const title =
    (isLoading && formatMessage({ id: 'app.loading', defaultMessage: 'Loading...' })) ||
    (notes && notes.title) ||
    (errors && formatMessage({ id: 'app.error', defaultMessage: 'Error' }))

  return (
    <Modal handleClose={handleClose} title={title} isOpen={isOpen}>
      {isLoading && <p>{formatMessage({ id: 'app.loading', defaultMessage: 'Loading...' })}</p>}
      {errors && <p>{errors}</p>}
      {notes && (
        <>
          <div className='d-flex gap-2 justify-start mb-2'>
            {categoriesArray &&
              categoriesArray
                .filter(categoryObj => notes.categories && notes.categories.includes(categoryObj._id))
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
          <>
            {notes.attachments &&
              notes.attachments.map((attachment: Attachment) => (
                <img key={attachment._id} className='img-fluid' src={attachment.path} alt='' />
              ))}
          </>
          <div className={stylesNote.fullNote}>
            <button
              type='button'
              className={`btn btn-sm btn-secondary float-end sticky-top ${stylesNote.btn__copy} ${
                isCopied ? stylesBtn.btn__primary : stylesBtn.btn__secondary
              }`}
              onClick={() => copyToClipboard(notes.desc, handleSetIsCopied)}
              title={formatMessage({ id: 'app.copyClipboard', defaultMessage: 'Copy text to clipboard' })}
            >
              <i className={isCopied ? 'bi bi-clipboard-check-fill' : 'bi bi-clipboard-fill'}></i>
            </button>
            {parse(notes.desc)}
          </div>
        </>
      )}
    </Modal>
  )
}

export default FullNote
