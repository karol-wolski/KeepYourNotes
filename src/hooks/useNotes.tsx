import { useEffect, useState } from 'react'
import { Note } from '../components/notes/Notes'
import { asyncFetch } from '../helpers/asyncFetch'

const useNotes = (id?: string) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const path = id ? `notes/${id}` : 'notes'

  useEffect(() => {
    asyncFetch(path, 'GET').then(response => {
      if (response.data) {
        setNotes(response.data)
        setIsLoading(false)
      }
    })
  }, [id])

  return { notes, isLoading, setNotes }
}

export default useNotes
