import { useState } from 'react'
import { Category } from '../add-category/AddCategory'
import MenageCategories from '../manageCategories/ManageCategories'
import FocusTrap from 'focus-trap-react'

interface ICategories {
  handleClose: () => void
  categories: Category[]
  filter: (categoryId: string) => void
  handleRemoveCategory: (categoryId: string) => void
  handleEditCategory: (category: Category, cb?: () => void) => void
  isOpen: boolean
}

const Categories = ({
  handleClose,
  categories,
  filter,
  handleRemoveCategory,
  handleEditCategory,
  isOpen,
}: ICategories) => {
  const [isOpenManageModal, setIsOpenMenageModal] = useState(false)
  const handleOpenManageModal = () => setIsOpenMenageModal(true)
  const handleCloseMenageModal = () => setIsOpenMenageModal(false)

  return (
    <>
      <FocusTrap active={isOpen}>
        <div className='offcanvas offcanvas-start show' tabIndex={-1} id='offcanvas' aria-labelledby='offcanvasLabel'>
          <div className='offcanvas-header'>
            <h5 className='offcanvas-title' id='offcanvasLabel'>
              Categories
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
              onClick={handleClose}
            ></button>
          </div>
          <div className='offcanvas-body'>
            <div className='list-group'>
              <button type='button' className='btn btn-primary' onClick={handleOpenManageModal}>
                <i className='bi bi-folder'></i> Manage categories
              </button>
              <button type='button' className='list-group-item list-group-item-action' onClick={() => filter('all')}>
                all
              </button>
              {categories &&
                categories.map(({ _id: id, name }) => (
                  <button
                    key={name}
                    type='button'
                    className='list-group-item list-group-item-action'
                    onClick={() => filter(id)}
                  >
                    {name}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </FocusTrap>
      {isOpenManageModal && (
        <MenageCategories
          categories={categories}
          handleCloseMenageModal={handleCloseMenageModal}
          handleEditCategory={handleEditCategory}
          handleRemoveCategory={handleRemoveCategory}
          isOpen={isOpenManageModal}
        />
      )}
    </>
  )
}

export default Categories
