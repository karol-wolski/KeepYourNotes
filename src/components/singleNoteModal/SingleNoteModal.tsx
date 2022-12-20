import { Category } from '../add-category/AddCategory'
import { Note } from '../notes/Notes'
import parse from 'html-react-parser'

interface IModal {
  note: Note
  handleClose: () => void
  filterNotes: (categoryId: string) => void
  categories: Category[]
}

const SingleNoteModal = ({ note, handleClose, filterNotes, categories: categoriesArray }: IModal) => {
  const { title, desc, img, categories } = note
  return (
    <div
      className='modal fade show'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex={-1}
      aria-labelledby='staticBackdropLabel'
      aria-hidden='false'
      style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='staticBackdropLabel'>
              {title}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={handleClose}
            ></button>
          </div>
          <div className='modal-body'>
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
            <div>{parse(desc)}</div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleNoteModal
