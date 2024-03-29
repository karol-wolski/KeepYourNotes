import useCategories from '../../hooks/useCategories'
import { IUpdateNotesArray } from '../../pages/Notes'
import Masonry from 'react-masonry-css'
import Note from '../note/Note'
import useUsers from '../../hooks/useUsers'

export type Attachment = {
  _id: string
  path: string
  name: string
  mimetype: string
}

export type CheckListElement = {
  id: string
  value: string
  checked: boolean
}

export type Collaborator = {
  _id?: string
  email: string
  permission: string
}

export type Note = {
  _id: string
  title: string
  desc: string
  attachments?: Attachment[]
  categories?: string[]
  createdBy?: string
  pinIt: boolean
  backgroundColor?: number
  numberOfAttachments?: number
  list: CheckListElement[]
  collaborators?: Collaborator[]
}

export type NewNote = Omit<Note, '_id' | 'createdBy'>

interface INotes {
  filterNotes: (categoryId: string) => void
  notes: Note[]
  update: (obj: IUpdateNotesArray) => void
  refresh: () => void
}

const Notes = ({ notes, filterNotes, update, refresh }: INotes) => {
  const { categories } = useCategories()
  const getUser = useUsers()

  const userData = { id: getUser?._id || '', email: getUser?.email || '' }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='row'
      columnClassName='note col-12 col-sm-6 col-md-4 col-xl-3'
    >
      {notes.map(note => (
        <Note
          key={note._id}
          note={note}
          filterNotes={filterNotes}
          categories={categories}
          update={update}
          refresh={refresh}
          user={userData}
        />
      ))}
    </Masonry>
  )
}

export default Notes
