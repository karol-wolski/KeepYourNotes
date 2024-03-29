import { useEffect, useState } from 'react'
import AddEditNote from '../components/addEditNote/AddEditNote'
import Categories from '../components/categories/Categories'
import Navigation from '../components/navigation/Navigation'
import Notes, { Note } from '../components/notes/Notes'
import SearchForm from '../components/searchForm/SearchForm'
import useBoolean from '../hooks/useBoolean'
import useCategories from '../hooks/useCategories'
import useNotes from '../hooks/useNotes'
import LoaderPage from '../components/loaderPage/LoaderPage'
import NoNotes from '../components/noNotes/NoNotes'
import { useIntl } from 'react-intl'
import { ICategory } from '../components/addCategory/AddCategory'

export interface IUpdateNotesArray {
  method: string
  data: Note
}

const NotesPage = () => {
  const { notes, errors, isLoading, update, refresh } = useNotes<Note[] | undefined>()
  const { categories } = useCategories()
  const [filteredNotes, setFilteredNotes] = useState<Note[] | undefined>()
  const [isOpenAddNoteModal, { setTrue: openAddNoteModal, setFalse: closeAddNoteModal }] = useBoolean()
  const [isOpenCategories, { setFalse: closeCategories, toggle: toggleCategories }] = useBoolean()
  const [modifyNote, setModifyNote] = useState<IUpdateNotesArray>()
  const [activeCategory, setActiveCategory] = useState<ICategory>()

  const updateNotesArray = (obj: IUpdateNotesArray) => setModifyNote(obj)

  useEffect(() => {
    if (Array.isArray(notes) && notes.length > 0) {
      const sortArray = notes.sort((a, b) => Number(b.pinIt) - Number(a.pinIt))
      setFilteredNotes(sortArray)
    }
  }, [notes])

  useEffect(() => {
    if (Array.isArray(notes)) {
      if (modifyNote?.method === 'DELETE' && modifyNote?.data) {
        const removeNote = notes.filter(note => note._id !== modifyNote.data._id)
        update(removeNote)
      }
      if (modifyNote?.method === 'PATCH' && modifyNote?.data) {
        const editNotes = notes.map(noteEl =>
          noteEl._id === modifyNote?.data._id ? { ...noteEl, ...modifyNote.data } : noteEl,
        )
        update(editNotes)
      }
      if (modifyNote?.method === 'POST' && modifyNote?.data) {
        const saveNote = [...notes, modifyNote.data]
        update(saveNote)
      }
    }
  }, [modifyNote])

  const filterByCategory = (categoryId: string) => {
    if (Array.isArray(notes)) {
      let filteredNotes = notes.filter(note => note.categories?.find(category => category === categoryId))
      const filterdCategory = categories.find(category => category._id === categoryId)
      setActiveCategory(filterdCategory)
      if (categoryId === 'all') filteredNotes = notes
      setFilteredNotes(filteredNotes)
    }
  }

  const searchByTitle = (text: string) => {
    if (Array.isArray(notes)) {
      const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(text.toLowerCase()))
      setFilteredNotes(filteredNotes)
    }
  }

  const { formatMessage } = useIntl()

  return (
    <>
      <div className='App'>
        <Navigation openAddNoteModal={openAddNoteModal} openCategories={toggleCategories} />
        <SearchForm searchByTitle={searchByTitle} />
        {errors && <p>{errors}</p>}
        {isLoading && <LoaderPage isDark={true} />}
        {notes?.length === 0 && <NoNotes />}
        {!!filteredNotes?.length && (
          <div className='container'>
            <div className='d-flex align-items-center justify-content-between my-4'>
              <p className='my-auto'>
                {formatMessage({ id: 'app.numOfNotes', defaultMessage: 'Number of notes' })}:{' '}
                <span className='fw-bold'>{filteredNotes?.length}</span>
              </p>
              {activeCategory && (
                <button
                  type='button'
                  className='btn btn-outline-secondary d-flex'
                  onClick={() => filterByCategory('all')}
                >
                  <span>{activeCategory?.name}</span>
                  <i className='bi bi-x-lg ms-2'></i>
                </button>
              )}
            </div>
            <Notes notes={filteredNotes} update={updateNotesArray} filterNotes={filterByCategory} refresh={refresh} />
          </div>
        )}
      </div>
      {isOpenAddNoteModal && (
        <AddEditNote
          handleClose={closeAddNoteModal}
          update={updateNotesArray}
          categories={categories}
          isOpen={isOpenAddNoteModal}
        />
      )}
      {isOpenCategories && (
        <Categories handleClose={closeCategories} filter={filterByCategory} isOpen={isOpenCategories} />
      )}
    </>
  )
}

export default NotesPage
