import { Category } from '../add-category/AddCategory'
import { Note } from '../notes/Notes'
import parse from 'html-react-parser'
import Modal from '../modal/Modal'

interface IModal {
  note: Note
  handleClose: () => void
  filterNotes: (categoryId: string) => void
  categories: Category[]
}

const FullNote = ({ note, handleClose, filterNotes, categories: categoriesArray }: IModal) => {
  const { title, desc, img, categories } = note
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
      <div>{parse(desc)}</div>
    </Modal>
  )
}

export default FullNote
