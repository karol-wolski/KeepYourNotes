import { useEffect, useRef, useState } from 'react'
import { ICategory } from '../addCategory/AddCategory'
import Modal from '../modal/Modal'
import stylesBtn from '../../styles/buttons.module.scss'
import { isEqual } from '../../helpers/isEqual'
import Spinner from '../spinner/Spinner'
import useFetch from '../../hooks/useFetch'

interface IManageCategories {
  categories: ICategory[]
  handleCloseManageModal: () => void
  update: (categoryArray: ICategory[]) => void
  isOpen: boolean
}

const ManageCategories = ({ categories, handleCloseManageModal, update, isOpen }: IManageCategories) => {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { data, isLoading, fetchData } = useFetch<ICategory>()
  const [activeBtnName, setActiveBtnName] = useState<string>('')
  const [currentMethod, setCurrentMethod] = useState<string>('')

  const removeCategory = (categoryId: string) => {
    fetchData(`categories/${categoryId}`, 'DELETE')
    setCurrentMethod('DELETE')
  }

  const updateCategory = (id: string, elIndex: number) => {
    const inputRef = inputRefs.current[elIndex]
    const category = {
      ...categories[elIndex],
      name: inputRef.value,
    }
    setCurrentMethod('PATCH')
    fetchData(`categories/${id}`, 'PATCH', category)
  }

  useEffect(() => {
    if (currentMethod === 'DELETE' && data) {
      const removeCategory = categories.filter(category => category._id !== data._id)
      update(removeCategory)
    }
    if (currentMethod === 'PATCH' && data) {
      const editCategory = categories.map(categoryEl =>
        categoryEl._id === data._id ? { ...categoryEl, ...data } : categoryEl,
      )
      update(editCategory)
    }
  }, [data, currentMethod])

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
                    onClick={() => {
                      setActiveBtnName(`update-${index}`)
                      updateCategory(id, index)
                    }}
                    aria-label='Update category'
                  >
                    {isLoading && isEqual<string>(activeBtnName, `update-${index}`) ? (
                      <Spinner altText='Updating...' classCSS='text-white' />
                    ) : (
                      <i className='bi bi-check2'></i>
                    )}
                  </button>
                </td>
                <td>
                  <button
                    className={`btn btn-sm btn-danger ${stylesBtn.btn__danger}`}
                    onClick={() => {
                      setActiveBtnName(`delete-${index}`)
                      removeCategory(id)
                    }}
                    aria-label='Remove category'
                  >
                    {isLoading && isEqual<string>(activeBtnName, `delete-${index}`) ? (
                      <Spinner altText='Removing...' classCSS='text-white' />
                    ) : (
                      <i className='bi bi-trash'></i>
                    )}
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
