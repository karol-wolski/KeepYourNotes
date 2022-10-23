import { useState } from 'react'
import AddNote from './components/add-note/AddNote'
import Navigation from './components/navigation/Navigation'
import Notes, { Note } from './components/notes/Notes'

function App() {
  const [isOpenAddNoteModal, setIsOpenAddNoteModal] = useState(false)
  const openAddNoteModal = () => setIsOpenAddNoteModal(true)
  const closeAddNoteModal = () => setIsOpenAddNoteModal(false)
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '0001',
      title: 'Note 1',
      desc: 'This is note number 1',
      createdBy: 'John Doe',
      createdDate: 1666463333,
      updatedDate: 1666463333,
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
  ])

  const saveNewNote = (data: Note) => {
    console.log(data)
    setNotes([...notes, data])
    closeAddNoteModal()
  }

  const handleRemoveNote = (noteId: string) => {
    const removeNOte = notes.filter(note => note.id !== noteId)
    setNotes(removeNOte)
  }

  return (
    <>
      <div className='App'>
        <Navigation openAddNoteModal={openAddNoteModal} />
        <Notes notesArray={notes} handleRemoveNote={handleRemoveNote} />
      </div>
      {isOpenAddNoteModal && <AddNote handleClose={closeAddNoteModal} handleSaveNote={saveNewNote} />}
    </>
  )
}

export default App
