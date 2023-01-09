import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext, IAuthContext } from '../../context/AuthContext'
import { removeFromLocalStorage } from '../../helpers/localStorage'
import useBoolean from '../../hooks/useBoolean'
import stylesBtn from '../../styles/buttons.module.scss'

interface INavigation {
  openAddNoteModal?: () => void
  openAddCategoryModal?: () => void
  openCategories?: () => void
}

const Navigation = ({ openAddNoteModal, openAddCategoryModal, openCategories }: INavigation) => {
  const { setIsLoggedIn } = useContext(AuthContext) as IAuthContext
  const [isNavCollapsed, { toggle: toggleCollapsed }] = useBoolean()
  const [isUserNavOpen, { toggle: toggleNavOpen }] = useBoolean()

  const { pathname } = useLocation()
  const isProfileSettings = pathname.includes('profile')

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
          onClick={toggleCollapsed}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`}
          id='navbarSupportedContent'
        >
          <div className='gap-2 d-flex justify-content-start'>
            {isProfileSettings ? (
              <>
                <Link className='btn text-white' to='/' role='button'>
                  Notes
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          <div className='dropdown'>
            <Link
              className='btn text-white'
              to='#'
              role='button'
              data-bs-toggle='dropdown'
              aria-expanded={isUserNavOpen ? true : false}
              onClick={toggleNavOpen}
            >
              Settings
            </Link>

            <ul className={`${isUserNavOpen ? 'd-block' : ''} dropdown-menu`}>
              <li>
                <Link className='btn' to='/profile/edit' role='button'>
                  Profile
                </Link>
              </li>
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
