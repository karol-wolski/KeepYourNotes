import { useState } from 'react'
import { Category } from '../add-category/AddCategory'
import { Note } from '../notes/Notes'
import parse from 'html-react-parser'
import Modal from '../modal/Modal'
import { copyToClipboard } from '../../helpers/copyToClipboard'
import stylesNote from './FullNote.module.scss'
import stylesBtn from '../../styles/buttons.module.scss'

interface IModal {
  note: Note
  handleClose: () => void
  filterNotes: (categoryId: string) => void
  categories: Category[]
}

const FullNote = ({ note, handleClose, filterNotes, categories: categoriesArray }: IModal) => {
  const { title, desc, img, categories } = note
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleSetIsCopied = () => setIsCopied(true)

  return (
    <Modal handleClose={handleClose} title={title}>
      <div className='d-flex gap-2 justify-start mb-2'>
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
      {img}
      <div className={stylesNote.fullNote}>
        <button
          type='button'
          className={`btn btn-sm btn-secondary float-end sticky-top ${stylesNote.btn__copy} ${
            isCopied ? stylesBtn.btn__primary : stylesBtn.btn__secondary
          }`}
          onClick={() => copyToClipboard(desc, handleSetIsCopied)}
          title='Copy to clipboard'
        >
          <i className={isCopied ? 'bi bi-clipboard-check-fill' : 'bi bi-clipboard-fill'}></i>
        </button>
        {parse(desc)}
      </div>
    </Modal>
  )
}

export default FullNote
