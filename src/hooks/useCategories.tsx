import { useEffect, useState } from 'react'
import { Category } from '../components/add-category/AddCategory'
import { asyncFetch } from '../helpers/asyncFetch'

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])

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
