import { useState } from 'react'

interface INavigation {
  openAddNoteModal: () => void
  openAddCategoryModal: () => void
}

const Navigation = ({ openAddNoteModal, openAddCategoryModal }: INavigation) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)
  return (
    <nav className='navbar navbar-expand-lg bg-light'>
      <div className='container'>
        <a className='navbar-brand' href='#'>
          KeepYourNotes
        </a>
        <button
          className='navbar-toggler'
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
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id='navbarSupportedContent'>
          <div className='gap-2 d-flex justify-content-start'>
            <button type='button' className='btn btn-primary btn-sm' onClick={openAddNoteModal}>
              Add note
            </button>
            <button type='button' className='btn btn-primary btn-sm' onClick={openAddCategoryModal}>
              Add category
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
