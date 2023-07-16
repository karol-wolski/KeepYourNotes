import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext, IAuthContext } from '../../context/AuthContext'
import { removeFromLocalStorage } from '../../helpers/localStorage'
import useBoolean from '../../hooks/useBoolean'
import stylesBtn from '../../styles/buttons.module.scss'

interface INavigation {
  openAddNoteModal?: () => void
  openAddChecklistModal?: () => void
  openCategories?: () => void
}

const Navigation = ({ openAddNoteModal, openCategories }: INavigation) => {
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
          className={`${!isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`}
          id='navbarSupportedContent'
        >
          <div className='gap-2 d-flex justify-content-start'>
            {isProfileSettings ? (
              <>
                <Link className='btn text-white' to='/' role='button'>
                  <FormattedMessage id='app.notes' defaultMessage='Notes' />
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
                  <FormattedMessage id='app.categories' defaultMessage='Categories' />
                </button>
                <button
                  type='button'
                  className={`btn btn-primary btn-sm ${stylesBtn.btn__primary}`}
                  onClick={openAddNoteModal}
                >
                  <FormattedMessage id='app.addNote' defaultMessage='Add note' />
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
              <FormattedMessage id='app.settings' defaultMessage='Settings' />
            </Link>

            <ul className={`${isUserNavOpen ? 'd-block' : ''} dropdown-menu`}>
              <li>
                <Link className='btn' to='/profile/app' role='button'>
                  <FormattedMessage id='app.application' defaultMessage='Application' />
                </Link>
              </li>
              <li>
                <Link className='btn' to='/profile/edit' role='button'>
                  <FormattedMessage id='app.profile' defaultMessage='Profile' />
                </Link>
              </li>
              <li>
                <button className='dropdown-item' onClick={logOut}>
                  <FormattedMessage id='app.logout' defaultMessage='Logout' />
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
