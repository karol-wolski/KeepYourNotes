import { useEffect, useState } from 'react'
import { Note } from '../components/notes/Notes'
import { asyncFetch } from '../helpers/asyncFetch'

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    asyncFetch('notes', 'GET').then(response => {
      if (response.data) {
        setNotes(response.data)
      }
    })
  }, [])

  return { notes, setNotes }
}

export default useNotes
