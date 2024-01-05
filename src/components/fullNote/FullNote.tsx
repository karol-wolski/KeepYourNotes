import { useState, useRef, Fragment, useEffect } from 'react'
import { ICategory } from '../addCategory/AddCategory'
import { Attachment, Note } from '../notes/Notes'
import parse from 'html-react-parser'
import Modal from '../modal/Modal'
import { copyToClipboard } from '../../helpers/copyToClipboard'
import stylesNote from './FullNote.module.scss'
import stylesBtn from '../../styles/buttons.module.scss'
import useNotes from '../../hooks/useNotes'
import { useIntl } from 'react-intl'
import { useReactToPrint } from 'react-to-print'

interface IModal {
  noteId: string
  handleClose: () => void
  filterNotes: (categoryId: string) => void
  categories: ICategory[]
  isOpen: boolean
}

const FullNote = ({ noteId, handleClose, filterNotes, categories: categoriesArray, isOpen }: IModal) => {
  const { notes, errors, isLoading, fetchData } = useNotes<Note>(noteId)
  const [note, setNote] = useState<Note | undefined>()
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const handleSetIsCopied = () => setIsCopied(true)
  const { formatMessage } = useIntl()
  const title =
    (isLoading && formatMessage({ id: 'app.loading', defaultMessage: 'Loading...' })) ||
    (notes && notes.title) ||
    (errors && formatMessage({ id: 'app.error', defaultMessage: 'Error' }))
  const ref = useRef<HTMLDivElement | null>(null)

  const marginTop = '10px'
  const marginRight = '5px'
  const marginBottom = '10px'
  const marginLeft = '5px'
  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`
  }

  useEffect(() => setNote(notes), [notes])

  const handlePrintToPdf = useReactToPrint({
    content: () => ref?.current,
    documentTitle: notes?.title,
    onAfterPrint: () => console.log('success'),
  })

  const toggleChecklistItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findItem = note?.list.find(item => item.value === e.target.id)
    if (findItem && note) {
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

  const saveOnClose = async () => {
    if (note?.list.length) await fetchData(`notes/${noteId}`, 'PATCH', note)
    handleClose()
  }

  return (
    <Modal
      handleClose={saveOnClose}
      title={title}
      isOpen={isOpen}
      btnName={formatMessage({ id: 'app.printNote', defaultMessage: 'Print note' })}
      handleBtnEvent={handlePrintToPdf}
    >
      {isLoading && <p>{formatMessage({ id: 'app.loading', defaultMessage: 'Loading...' })}</p>}
      {errors && <p>{errors}</p>}
      {notes && (
        <>
          <style>{getPageMargins()}</style>
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
          <div ref={ref}>
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
              {notes.desc && parse(notes.desc)}

              {notes.list &&
                notes.list.map(({ id, value, checked }) => {
                  return (
                    <label key={id} htmlFor={value} className='d-block mb-2'>
                      <input
                        type='checkbox'
                        name=''
                        id={value}
                        className='form-check-input'
                        defaultChecked={checked}
                        onChange={toggleChecklistItem}
                      />{' '}
                      {value}
                    </label>
                  )
                })}
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}

export default FullNote
