import { useEffect, useState } from 'react'
import { Note } from '../components/notes/Notes'
import { asyncFetch } from '../helpers/asyncFetch'

const useNotes = (id?: string) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [shouldRefetch, refetch] = useState({})
  const refresh = () => refetch({})

  const path = id ? `notes/${id}` : 'notes'

  useEffect(() => {
    asyncFetch(path, 'GET').then(response => {
      if (response.data) {
        setNotes(response.data)
        setIsLoading(false)
      }
    })
  }, [id, shouldRefetch])

  return { notes, isLoading, setNotes, refresh }
}

export default useNotes
