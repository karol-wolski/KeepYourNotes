import { useRef } from 'react'
import { ICategory } from '../addCategory/AddCategory'
import Modal from '../modal/Modal'
import stylesBtn from '../../styles/buttons.module.scss'

interface IManageCategories {
  categories: ICategory[]
  handleCloseManageModal: () => void
  handleRemoveCategory: (categoryId: string) => void
  handleEditCategory: (category: ICategory, cb?: () => void) => void
  isOpen: boolean
}

const ManageCategories = ({
  categories,
  handleEditCategory,
  handleCloseManageModal,
  handleRemoveCategory,
  isOpen,
}: IManageCategories) => {
  const inputRefs = useRef<HTMLInputElement[]>([])

  const test = (id: string, elIndex: number) => {
    const inputRef = inputRefs.current[elIndex]
    const editCategory = {
      ...categories[elIndex],
      name: inputRef.value,
    }

    handleEditCategory(editCategory)
  }

  return (
    <Modal title='Manage Categories' isDisabledBtn={true} handleClose={handleCloseManageModal} isOpen={isOpen}>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Category</th>
            <th scope='col'>Save</th>
            <th scope='col'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map(({ _id: id, name }, index) => (
              <tr key={id}>
                <td>
                  <input
                    type='text'
                    defaultValue={name}
                    ref={el => (inputRefs.current[index] = el as HTMLInputElement)}
                  />
                </td>
                <td>
                  <button
                    className={`btn btn-sm btn-warning ${stylesBtn.btn__primary}`}
                    onClick={() => test(id, index)}
                  >
                    <i className='bi bi-check2'></i>
                  </button>
                </td>
                <td>
                  <button
                    className={`btn btn-sm btn-danger ${stylesBtn.btn__danger}`}
                    onClick={() => handleRemoveCategory(id)}
                  >
                    <i className='bi bi-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Modal>
  )
}

export default ManageCategories
