import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, IAuthContext } from '../../context/AuthContext'
import { removeFromLocalStorage } from '../../helpers/localStorage'
import stylesBtn from '../../styles/buttons.module.scss'

interface INavigation {
  openAddNoteModal: () => void
  openAddCategoryModal: () => void
  openCategories: () => void
}

const Navigation = ({ openAddNoteModal, openAddCategoryModal, openCategories }: INavigation) => {
  const { setIsLoggedIn } = useContext(AuthContext) as IAuthContext
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const [isUserNavOpen, setIsUserNavOpen] = useState(false)

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)
  const setUserNavOpen = () => setIsUserNavOpen(state => !state)

  const logOut = () => {
    removeFromLocalStorage('token')
    setIsLoggedIn((state: boolean) => !state)
  }

  return (
    <nav className='navbar navbar-expand-lg bg-dark'>
      <div className='container'>
        <Link to='/' className='navbar-brand text-white'>
          KeepYourNotes
        </Link>
        <button
          className='navbar-toggler navbar-dark'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label='Toggle navigation'
          onClick={handleNavCollapse}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`}
          id='navbarSupportedContent'
        >
          <div className='gap-2 d-flex justify-content-start'>
            <button
              className='btn btn-primary'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasScrolling'
              aria-controls='offcanvasScrolling'
              onClick={openCategories}
            >
              Categories
            </button>
            <button
              type='button'
              className={`btn btn-primary btn-sm ${stylesBtn.btn__primary}`}
              onClick={openAddNoteModal}
            >
              Add note
            </button>
            <button type='button' className='btn btn-primary btn-sm' onClick={openAddCategoryModal}>
              Add category
            </button>
          </div>
          <div className='dropdown'>
            <a
              className='btn text-white'
              href='#'
              role='button'
              data-bs-toggle='dropdown'
              aria-expanded={isUserNavOpen ? true : false}
              onClick={setUserNavOpen}
            >
              Account
            </a>

            <ul className={`${isUserNavOpen ? 'd-block' : ''} dropdown-menu`}>
              <li>
                <button className='dropdown-item' onClick={logOut}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
