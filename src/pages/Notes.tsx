import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import AddCategory, { Category } from '../components/add-category/AddCategory'
import AddNote from '../components/add-note/AddNote'
import Categories from '../components/categories/Categories'
import Navigation from '../components/navigation/Navigation'
import Notes, { Note } from '../components/notes/Notes'
import SearchForm from '../components/searchForm/SearchForm'
import { asyncFetch } from '../helpers/asyncFetch'

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes)
  const [categories, setCategories] = useState<Category[]>([])
  const [isOpenAddNoteModal, setIsOpenAddNoteModal] = useState(false)
  const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false)
  const [isOpenCategories, setIsOpenCategories] = useState(false)

  const openAddNoteModal = () => setIsOpenAddNoteModal(true)
  const closeAddNoteModal = () => setIsOpenAddNoteModal(false)
  const openAddCategoryModal = () => setIsOpenAddCategoryModal(true)
  const closeAddCategoryModal = () => setIsOpenAddCategoryModal(false)
  const openCategories = () => setIsOpenCategories(true)
  const closeCategories = () => setIsOpenCategories(false)

  useEffect(() => {
    asyncFetch('categories', 'GET').then(response => {
      if (response.data) {
        setCategories(response.data)
      }
    })

    asyncFetch('notes', 'GET').then(response => {
      if (response.data) {
        setNotes(response.data)
      }
    })
  }, [])

  useEffect(() => {
    const sortArray = notes.sort((a, b) => Number(b.pinIt) - Number(a.pinIt))
    setFilteredNotes(sortArray)
  }, [notes])

  const handleSaveNewNote = (data: Note) => {
    asyncFetch('notes', 'POST', data).then(response => {
      if (response.data) {
        setNotes([...notes, response.data])
        closeAddNoteModal()
      }
    })
  }

  const handleRemoveNote = (noteId: string) => {
    asyncFetch(`notes/${noteId}`, 'DELETE').then(response => {
      if (response.data) {
        const removeNOte = notes.filter(note => note._id !== noteId)
        setNotes(removeNOte)
      }
    })
  }

  const handleDuplicateNote = (noteId: string) => {
    const note = notes.find(note => note._id === noteId)
    if (note) {
      handleSaveNewNote({
        ...note,
        _id: uuid(),
      })
    }
  }

  const handleEditNote = (note: Note, cb?: () => void) => {
    asyncFetch(`notes/${note._id}`, 'PATCH', note).then(response => {
      if (response.message === 'Success') {
        const editNotes = notes.map(noteEl => (noteEl._id === note._id ? { ...noteEl, ...note } : noteEl))
        setNotes(editNotes)
        if (cb) cb()
      }
    })
  }

  const handleSaveCategory = (data: Category) => {
    asyncFetch('categories', 'POST', data).then(response => {
      if (response.data) {
        setCategories([...categories, data])
        closeAddCategoryModal()
      }
    })
  }

  const filterByCategory = (categoryId: string) => {
    let filteredNotes = notes.filter(note => note.categories?.find(category => category === categoryId))
    if (categoryId === 'all') filteredNotes = notes
    setFilteredNotes(filteredNotes)
  }

  const searchByTitle = (text: string) => {
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(text.toLowerCase()))
    setFilteredNotes(filteredNotes)
  }

  const handleRemoveCategory = (categoryId: string) => {
    asyncFetch(`categories/${categoryId}`, 'DELETE').then(response => {
      if (response.data) {
        const removeCategory = categories.filter(category => category._id !== categoryId)
        setCategories(removeCategory)
      }
    })
  }

  const handleEditCategory = (category: Category, cb?: () => void) => {
    asyncFetch(`categories/${category._id}`, 'PATCH', category).then(response => {
      if (response.message === 'Success') {
        const editCategory = categories.map(categoryEl =>
          categoryEl._id === category._id ? { ...categoryEl, ...category } : categoryEl,
        )
        setCategories(editCategory)
        if (cb) cb()
      }
    })
  }

  return (
    <>
      <div className='App'>
        <Navigation
          openAddNoteModal={openAddNoteModal}
          openAddCategoryModal={openAddCategoryModal}
          openCategories={openCategories}
        />
        <SearchForm searchByTitle={searchByTitle} />
        <Notes
          notesArray={filteredNotes}
          handleRemoveNote={handleRemoveNote}
          handleDuplicateNote={handleDuplicateNote}
          handleEditNote={handleEditNote}
          filterNotes={filterByCategory}
          categories={categories}
        />
      </div>
      {isOpenAddNoteModal && (
        <AddNote handleClose={closeAddNoteModal} handleSaveNote={handleSaveNewNote} categories={categories} />
      )}
      {isOpenAddCategoryModal && (
        <AddCategory handleClose={closeAddCategoryModal} handleSaveCategory={handleSaveCategory} />
      )}
      {isOpenCategories && (
        <Categories
          handleClose={closeCategories}
          categories={categories}
          filter={filterByCategory}
          handleRemoveCategory={handleRemoveCategory}
          handleEditCategory={handleEditCategory}
        />
      )}
    </>
  )
}

export default NotesPage
