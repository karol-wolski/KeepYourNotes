import { useEffect, useState } from 'react'
import useFetch from './useFetch'

const useNotes = <T,>(id?: string) => {
  const { data, errors, isLoading, fetchData } = useFetch<T>()
  const [notes, setNotes] = useState<T>()
  const path = id ? `notes/${id}` : 'notes'
  const update = (note: T) => setNotes(note)
  const [refetch, setRefetch] = useState({})

  const refresh = () => {
    setRefetch({})
  }

  useEffect(() => {
    fetchData(path, 'GET')
  }, [refetch])

  useEffect(() => {
    if (data) {
      setNotes(data)
    }
  }, [data])

  return { notes, errors, isLoading, fetchData, refresh, update }
}

export default useNotes
