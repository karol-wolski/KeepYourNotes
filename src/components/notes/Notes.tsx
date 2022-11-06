import { useState, useEffect } from 'react'
import { Category } from '../add-category/AddCategory'
import Note from '../note/Note'

export type Note = {
  id: string
  title: string
  desc: string
  img?: string
  categories?: string[]
  createdBy: string
  createdDate: number
  updatedDate: number
  pinIt: boolean
  backgroundColor?: number
}

interface INotes {
  notesArray: Notes
  handleRemoveNote: (noteId: string) => void
  handleDuplicateNote: (noteId: string) => void
  handleEditNote: (note: Note, cb?: () => void) => void
  filterNotes: (categoryId: string) => void
  categories: Category[]
}

type Notes = Note[]

const Notes = ({
  notesArray,
  handleRemoveNote,
  handleDuplicateNote,
  handleEditNote,
  filterNotes,
  categories,
}: INotes) => {
  const [notes, setNotes] = useState(notesArray)

  useEffect(() => setNotes(notesArray), [notesArray])

  return (
    <div className='container'>
      <>
        {notes.length > 0 ? (
          <div className='row g-3'>
            {notes.map(note => (
              <div key={note.id} className='col-12 col-sm-6 col-md-4 col-xl-3'>
                <Note
                  note={note}
                  handleRemoveNote={handleRemoveNote}
                  handleDuplicateNote={handleDuplicateNote}
                  handleEditNote={handleEditNote}
                  filterNotes={filterNotes}
                  categories={categories}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='row'>
            <p className='fs-4 text-center'>You do not have any notes yet.</p>
            <p className='text-center'>
              Click <span className='fw-semibold'>Add note</span> button and add your first note.
            </p>
          </div>
        )}
      </>
    </div>
  )
}

export default Notes
