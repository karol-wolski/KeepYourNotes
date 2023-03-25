import { useIntl } from 'react-intl'
import useCategories from '../../hooks/useCategories'
import { IUpdateNotesArray } from '../../pages/Notes'
import Masonry from 'react-masonry-css'
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

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <div className='container'>
      <>
        {notes && notes.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='row'
            columnClassName='note col-12 col-sm-6 col-md-4 col-xl-3'
          >
            {notes.map(note => (
              <Note key={note._id} note={note} filterNotes={filterNotes} categories={categories} update={update} />
            ))}
          </Masonry>
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
