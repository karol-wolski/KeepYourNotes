import { Category } from '../add-category/AddCategory'

interface ICategories {
  handleClose: () => void
  categories: Category[]
  filter: (categoryId: string) => void
}

const Categories = ({ handleClose, categories, filter }: ICategories) => {
  return (
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
          {categories &&
            categories.map(({ id, name }) => (
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
  )
}

export default Categories
