import useBoolean from '../../hooks/useBoolean'
import AddCategory from '../addCategory/AddCategory'
import ManageCategories from '../manageCategories/ManageCategories'
import FocusTrap from 'focus-trap-react'
import stylesBtn from '../../styles/buttons.module.scss'
import useCategories from '../../hooks/useCategories'
interface ICategories {
  handleClose: () => void
  filter: (categoryId: string) => void
  isOpen: boolean
}

const Categories = ({ handleClose, filter, isOpen }: ICategories) => {
  const { categories, update, isLoading, errors } = useCategories()
  const [isOpenManageModal, { setTrue: openManageModal, setFalse: closeManageModal }] = useBoolean()

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
            <AddCategory update={update} categories={categories} />
            <div className='list-group'>
              <button type='button' className={`btn btn-primary ${stylesBtn.btn__secondary}`} onClick={openManageModal}>
                <i className='bi bi-folder'></i> Manage categories
              </button>
              <button type='button' className='list-group-item list-group-item-action' onClick={() => filter('all')}>
                all
              </button>
              {isLoading && <p>Loading...</p>}
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
              {errors && <p>{errors}</p>}
            </div>
          </div>
        </div>
      </FocusTrap>
      {isOpenManageModal && (
        <ManageCategories
          categories={categories}
          handleCloseManageModal={closeManageModal}
          update={update}
          isOpen={isOpenManageModal}
        />
      )}
    </>
  )
}

export default Categories
