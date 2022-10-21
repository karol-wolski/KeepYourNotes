import { useState } from 'react'
import Note from '../note/Note'

interface INote {
  id: string
  title: string
  desc: string
  img?: string
}

const Notes = () => {
  const [notes, setNotes] = useState<INote[]>([
    {
      id: '0001',
      title: 'Note 1',
      desc: 'This is note number 1',
    },
    {
      id: '0002',
      title: 'Note 2',
      desc: 'This is note number 2',
    },
    {
      id: '0003',
      title: 'Note 3',
      desc: 'This is note number 3',
    },
    {
      id: '0004',
      title: 'Note 4',
      desc: 'This is note number 4',
    },
    {
      id: '0005',
      title: 'Note 5',
      desc: 'This is note number 5',
    },
    {
      id: '0006',
      title: 'Note 6',
      desc: 'This is note number 6',
    },
    {
      id: '0007',
      title: 'Note 7',
      desc: 'This is note number 7',
    },
    {
      id: '0008',
      title: 'Note 8',
      desc: 'This is note number 8',
    },
  ])

  const handleRemoveNote = (id: string) => {
    const removeNOte = notes.filter(note => note.id !== id)
    setNotes(removeNOte)
  }

  return (
    <div className='container'>
      <>
        {notes.length > 0 ? (
          <div className='row g-3'>
            {notes.map(note => (
              <div key={note.id} className='col-12 col-sm-6 col-md-4 col-xl-3'>
                <Note id={note.id} title={note.title} desc={note.desc} handleRemoveNote={handleRemoveNote} />
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
