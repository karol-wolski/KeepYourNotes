import { useEffect, useState } from 'react'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import stylesBtn from '../../styles/buttons.module.scss'

export interface INewCategory {
  name: string
}

export interface ICategory extends INewCategory {
  _id: string
}

interface IAddCategory {
  handleSaveCategory: (data: INewCategory) => void
  categories: ICategory[]
}

const AddCategory = ({ handleSaveCategory, categories }: IAddCategory) => {
  const [newCategory, setNewCategory] = useState<INewCategory>({
    name: '',
  })

  const [errors, setErrors] = useState('')
  const [success, setSuccess] = useState('')

  const addNewCategoryonChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewCategory({
      name: event.target.value,
    })

  const isNewCategory = !!newCategory.name.length

  const checkIfExist = (categories: ICategory[], category: INewCategory) =>
    categories.find(item => item.name.toLowerCase() === category.name.toLowerCase())

  const saveCategory = (event: React.FormEvent) => {
    event.preventDefault
    if (checkIfExist(categories, newCategory)) {
      setSuccess('')
      setErrors('The category name exists.')
    } else {
      handleSaveCategory(newCategory)
      setErrors('')
      setSuccess('Your category has been successfully added.')
    }
  }

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess('')
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [success])

  return (
    <form className='mb-2'>
      <div className='d-flex'>
        <LabelInput
          id='name'
          type='text'
          placeholder='Category name'
          labelText='Add new category'
          onChange={addNewCategoryonChange}
          isLabelVisible={false}
        />
        <button
          type='button'
          className={`btn btn-primary ${stylesBtn.btn__primary}`}
          disabled={!isNewCategory}
          onClick={saveCategory}
        >
          Add
        </button>
      </div>
      {errors && <Alert type={ALERT_TYPE.DANGER} text={errors} />}
      {success && <Alert type={ALERT_TYPE.SUCCESS} text={success} />}
    </form>
  )
}

export default AddCategory
