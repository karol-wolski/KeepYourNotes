import { useEffect, useState } from 'react'
import { ICategory } from '../components/addCategory/AddCategory'
import useFetch from './useFetch'

const useCategories = () => {
  const { data, errors, isLoading, refresh, fetchData } = useFetch<ICategory[]>()
  const [categories, setCategories] = useState<ICategory[]>([])

  const update = (categoryArray: ICategory[]) => setCategories(categoryArray)

  useEffect(() => {
    fetchData('categories', 'GET')
  }, [])

  useEffect(() => {
    if (data) {
      setCategories(data)
    }
  }, [data])

  return { categories, errors, update, isLoading, refresh }
}

export default useCategories
