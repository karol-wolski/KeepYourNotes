import { useIntl } from 'react-intl'
import useCategories from '../../hooks/useCategories'
import { IUpdateNotesArray } from '../../pages/Notes'
import Note from '../note/Note'

export type Attachment = {
  _id: string
  path: string
  name: string
  mimetype: string
}

export type AddNote = {
  title: string
  desc: string
  pinIt: boolean
  categories?: string[]
}

export type Note = {
  _id: string
  title: string
  desc: string
  attachments?: Attachment[]
  categories?: string[]
  createdBy: string
  pinIt: boolean
  backgroundColor?: number
}

interface INotes {
  filterNotes: (categoryId: string) => void
  notes: Note[]
  update: (obj: IUpdateNotesArray) => void
}

const Notes = ({ notes, filterNotes, update }: INotes) => {
  const { categories } = useCategories()
  const { formatMessage } = useIntl()

  return (
    <div className='container'>
      <>
        {notes && notes.length > 0 ? (
          <div className='row g-3'>
            {notes.map(note => (
              <div key={note._id} className='col-12 col-sm-6 col-md-4 col-xl-3'>
                <Note note={note} filterNotes={filterNotes} categories={categories} update={update} />
              </div>
            ))}
          </div>
        ) : (
          <div className='row'>
            <p className='fs-4 text-center'>
              {formatMessage({ id: 'app.noNote', defaultMessage: 'You do not have any notes yet.' })}
            </p>
            <p className='text-center'>
              {formatMessage({
                id: 'app.clickAddNoteBtn',
                defaultMessage: 'Click Add note button and add your first note.',
              })}
            </p>
          </div>
        )}
      </>
    </div>
  )
}

export default Notes
