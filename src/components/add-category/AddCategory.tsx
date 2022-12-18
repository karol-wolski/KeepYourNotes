import { useState } from 'react'
import uuid from 'react-uuid'

export type Category = {
  _id: string
  name: string
}

interface IAddCategory {
  handleSaveCategory: (data: Category) => void
  handleClose: () => void
}

const AddCategory = ({ handleClose, handleSaveCategory }: IAddCategory) => {
  const [category, setCategory] = useState<Category>({
    _id: uuid(),
    name: '',
  })

  const isVisibleSendButton = !!category.name.length

  const createNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className='modal fade show' tabIndex={-1} style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Add note</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={handleClose}
            ></button>
          </div>
          <div className='modal-body'>
            <div className='mb-3'>
              <label htmlFor='category-name' className='form-label'>
                Title
              </label>
              <input
                type='text'
                className='form-control'
                id='category-name'
                placeholder='Category name'
                name='name'
                onChange={createNote}
              />
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={handleClose}>
              Close
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => handleSaveCategory(category)}
              disabled={!isVisibleSendButton}
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategory
