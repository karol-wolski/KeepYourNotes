import { useEffect, useState } from 'react'
import { ICategory } from '../components/addCategory/AddCategory'
import { asyncFetch } from '../helpers/asyncFetch'

const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    asyncFetch('categories', 'GET').then(response => {
      if (response.data) {
        setCategories(response.data)
      }
    })
  }, [])

  return { categories, setCategories }
}

export default useCategories
