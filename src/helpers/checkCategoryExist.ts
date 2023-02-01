import { ICategory, INewCategory } from '../components/addCategory/AddCategory'

export const checkCategoryExist = (categories: ICategory[], category: INewCategory) =>
  !!categories.find(item => item.name.toLowerCase() === category.name.toLowerCase())
