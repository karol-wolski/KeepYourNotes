import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import AddCategory, { Category } from './components/add-category/AddCategory'
import AddNote from './components/add-note/AddNote'
import Categories from './components/categories/Categories'
import Navigation from './components/navigation/Navigation'
import Notes, { Note } from './components/notes/Notes'

const NOTES = [
  {
    id: '0001',
    title: 'Note 1',
    desc: 'This is note number 1',
    createdBy: 'John Doe',
    createdDate: 1666463333,
    updatedDate: 1666463333,
    categories: ['0001', '0002'],
  },
  {
    id: '0002',
    title: 'Note 2',
    desc: 'This is note number 2',
    createdBy: 'John Doe',
    createdDate: 1666463333,
    updatedDate: 1666463333,
  },
  {
    id: '0003',
    title: 'Note 3',
    desc: 'This is note number 3',
    createdBy: 'John Doe',
    createdDate: 1666463333,
    updatedDate: 1666463333,
    categories: ['0002'],
  },
  {
    id: '0004',
    title: 'Note 4',
    desc: 'This is note number 4',
    createdBy: 'John Doe',
    createdDate: 1666463333,
    updatedDate: 1666463333,
  },
  {
    id: '0005',
    title: 'Note 5',
    desc: 'This is note number 5',
    createdBy: 'John Doe',
    createdDate: 1666463333,
    updatedDate: 1666463333,
  },
  {
    id: '0006',
    title: 'Note 6',
    desc: 'This is note number 6',
    createdBy: 'John Doe',
    createdDate: 1666463333,
    updatedDate: 1666463333,
  },
  {
    id: '0007',
    title: 'Note 7',
    desc: 'This is note number 7',
    createdBy: 'John Doe',
    createdDate: 1666463333,
    updatedDate: 1666463333,
  },
  {
    id: '0008',
    title: 'Note 8',
    desc: 'This is note number 8',
    createdBy: 'John Doe',
    createdDate: 1666463333,
    updatedDate: 1666463333,
  },
]

const CATEGORIES = [
  {
    id: 'all',
    name: 'all',
  },
  {
    id: '0001',
    name: 'cooking',
  },
  {
    id: '0002',
    name: 'travel',
  },
]

function App() {
  const [isOpenAddNoteModal, setIsOpenAddNoteModal] = useState(false)
  const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false)
  const [isOpenCategories, setIsOpenCategories] = useState(false)

  const openAddNoteModal = () => setIsOpenAddNoteModal(true)
  const closeAddNoteModal = () => setIsOpenAddNoteModal(false)
  const openAddCategoryModal = () => setIsOpenAddCategoryModal(true)
  const closeAddCategoryModal = () => setIsOpenAddCategoryModal(false)
  const openCategories = () => setIsOpenCategories(true)
  const closeCategories = () => setIsOpenCategories(false)

  const [notes, setNotes] = useState<Note[]>(NOTES)
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes)
  const [categories, setCategories] = useState<Category[]>(CATEGORIES)

  useEffect(() => {
    setFilteredNotes(notes)
  }, [notes])

  const handleSaveNewNote = (data: Note) => {
    setNotes([...notes, data])
    closeAddNoteModal()
  }

  const handleRemoveNote = (noteId: string) => {
    const removeNOte = notes.filter(note => note.id !== noteId)
    setNotes(removeNOte)
  }

  const handleDuplicateNote = (noteId: string) => {
    const note = notes.find(note => note.id === noteId)
    if (note) {
      handleSaveNewNote({
        ...note,
        id: uuid(),
      })
    }
  }

  const handleEditNote = (note: Note, cb: () => void) => {
    const editNotes = notes.map(noteEl => (noteEl.id === note.id ? { ...noteEl, ...note } : noteEl))
    setNotes(editNotes)
    cb()
  }

  const handleSaveCategory = (data: Category) => {
    setCategories([...categories, data])
    closeAddCategoryModal()
  }

  const filterByCategory = (categoryId: string) => {
    let filteredNotes = notes.filter(note => note.categories?.find(category => category === categoryId))
    if (categoryId === 'all') filteredNotes = notes
    setFilteredNotes(filteredNotes)
  }

  return (
    <>
      <div className='App'>
        <Navigation
          openAddNoteModal={openAddNoteModal}
          openAddCategoryModal={openAddCategoryModal}
          openCategories={openCategories}
        />
        <Notes
          notesArray={filteredNotes}
          handleRemoveNote={handleRemoveNote}
          handleDuplicateNote={handleDuplicateNote}
          handleEditNote={handleEditNote}
          filterNotes={filterByCategory}
          categories={categories}
        />
      </div>
      {isOpenAddNoteModal && <AddNote handleClose={closeAddNoteModal} handleSaveNote={handleSaveNewNote} />}
      {isOpenAddCategoryModal && (
        <AddCategory handleClose={closeAddCategoryModal} handleSaveCategory={handleSaveCategory} />
      )}
      {isOpenCategories && (
        <Categories handleClose={closeCategories} categories={categories} filter={filterByCategory} />
      )}
    </>
  )
}

export default App
