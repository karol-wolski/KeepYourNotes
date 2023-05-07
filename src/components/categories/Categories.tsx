import useBoolean from '../../hooks/useBoolean'
import AddCategory, { ICategory } from '../addCategory/AddCategory'
import ManageCategories from '../manageCategories/ManageCategories'
import FocusTrap from 'focus-trap-react'
import stylesBtn from '../../styles/buttons.module.scss'
import useCategories from '../../hooks/useCategories'
import { useIntl } from 'react-intl'
import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
interface ICategories {
  handleClose: () => void
  filter: (categoryId: string) => void
  isOpen: boolean
}

const Categories = ({ handleClose, filter, isOpen }: ICategories) => {
  const { categories, update, isLoading, errors } = useCategories()
  const { data, statusCode, isLoading: isLoadingFetch, fetchData } = useFetch<ICategory>()
  const [isOpenManageModal, { setTrue: openManageModal, setFalse: closeManageModal }] = useBoolean()

  const categoryOnClick = (id: string) => {
    filter(id)
    handleClose()
  }

  const onSubmit = (categoryName: string) => {
    fetchData('categories', 'POST', { name: categoryName })
  }

  const { formatMessage } = useIntl()

  useEffect(() => {
    if (data) {
      update([...categories, data])
    }
  }, [data])

  return (
    <>
      <FocusTrap active={isOpen}>
        <div className='offcanvas offcanvas-start show' tabIndex={-1} id='offcanvas' aria-labelledby='offcanvasLabel'>
          <div className='offcanvas-header'>
            <h5 className='offcanvas-title' id='offcanvasLabel'>
              {formatMessage({ id: 'app.categories', defaultMessage: 'Categories' })}
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
            <AddCategory
              onSubmit={onSubmit}
              categories={categories}
              statusCode={statusCode}
              isLoading={isLoadingFetch}
            />
            <div className='list-group'>
              <button type='button' className={`btn btn-primary ${stylesBtn.btn__secondary}`} onClick={openManageModal}>
                <i className='bi bi-folder'></i>{' '}
                {formatMessage({ id: 'app.manageCategories', defaultMessage: 'Manage Categories' })}
              </button>
              <button type='button' className='list-group-item list-group-item-action' onClick={() => filter('all')}>
                {formatMessage({ id: 'app.all', defaultMessage: 'All' })}
              </button>
              {isLoading && <p>{formatMessage({ id: 'app.loading', defaultMessage: 'Loading...' })}</p>}
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
