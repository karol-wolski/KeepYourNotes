import useBoolean from '../../hooks/useBoolean'
import AddCategory, { ICategory, INewCategory } from '../addCategory/AddCategory'
import MenageCategories from '../manageCategories/ManageCategories'
import FocusTrap from 'focus-trap-react'
import stylesBtn from '../../styles/buttons.module.scss'

interface ICategories {
  handleClose: () => void
  categories: ICategory[]
  filter: (categoryId: string) => void
  handleRemoveCategory: (categoryId: string) => void
  handleEditCategory: (category: ICategory, cb?: () => void) => void
  handleSaveCategory: (category: INewCategory, cb?: () => void) => void
  isOpen: boolean
}

const Categories = ({
  handleClose,
  categories,
  filter,
  handleRemoveCategory,
  handleEditCategory,
  handleSaveCategory,
  isOpen,
}: ICategories) => {
  const [isOpenManageModal, { setTrue: openManageModal, setFalse: closeMenageModal }] = useBoolean()

  const categoryOnClick = (id: string) => {
    filter(id)
    handleClose()
  }

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
            <AddCategory handleSaveCategory={handleSaveCategory} categories={categories} />
            <div className='list-group'>
              <button type='button' className={`btn btn-primary ${stylesBtn.btn__secondary}`} onClick={openManageModal}>
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
                    onClick={() => categoryOnClick(id)}
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
          handleCloseMenageModal={closeMenageModal}
          handleEditCategory={handleEditCategory}
          handleRemoveCategory={handleRemoveCategory}
          isOpen={isOpenManageModal}
        />
      )}
    </>
  )
}

export default Categories
