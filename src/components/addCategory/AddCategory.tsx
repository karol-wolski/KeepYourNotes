import { useEffect, useRef, useState } from 'react'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import stylesBtn from '../../styles/buttons.module.scss'
import { checkCategoryExist } from '../../helpers/checkCategoryExist'
import useFetch from '../../hooks/useFetch'
import { useIntl } from 'react-intl'

export interface INewCategory {
  name: string
}

export interface ICategory extends INewCategory {
  _id: string
}

interface IAddCategory {
  update: (categoryArray: ICategory[]) => void
  categories: ICategory[]
}

const AddCategory = ({ update, categories }: IAddCategory) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { data, statusCode, isLoading, fetchData } = useFetch<ICategory>()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const { formatMessage } = useIntl()

  const [errors, setErrors] = useState('')
  const [success, setSuccess] = useState('')

  const setBtnDisabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsButtonDisabled(!!event.target.value.length)
  }

  const saveCategory = () => {
    const category = {
      name: inputRef.current?.value || '',
    }
    if (checkCategoryExist(categories, category)) {
      setSuccess('')
      setErrors(formatMessage({ id: 'app.categoryExist', defaultMessage: 'The category name exists.' }))
    } else {
      fetchData('categories', 'POST', category)
    }
  }

  const handleOnClick = (event: React.FormEvent) => {
    event.preventDefault()
    saveCategory()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      saveCategory()
    }
  }

  useEffect(() => {
    const updateAndClear = () => {
      if (statusCode === 201) {
        if (inputRef.current?.value) {
          inputRef.current.value = ''
        }
        setErrors('')
        setSuccess(
          formatMessage({ id: 'app.categoryAdded', defaultMessage: 'Your category has been successfully added.' }),
        )
        if (data) {
          update([...categories, data])
        }
        const timeout = setTimeout(() => {
          setSuccess('')
        }, 3000)
        return () => clearTimeout(timeout)
      }
    }
    updateAndClear()
  }, [data, statusCode])

  return (
    <form className='mb-2'>
      <div className='d-flex'>
        <LabelInput
          id='name'
          type='text'
          placeholder={formatMessage({ id: 'app.categoryName', defaultMessage: 'Category name' })}
          labelText={formatMessage({ id: 'app.categoryAddNew', defaultMessage: 'Add new category' })}
          onChange={setBtnDisabled}
          isLabelVisible={false}
          inputRef={inputRef}
          onKeyDown={handleKeyDown}
          value=''
        />
        <button
          type='button'
          className={`btn btn-primary ${stylesBtn.btn__primary}`}
          disabled={!isButtonDisabled}
          onClick={handleOnClick}
        >
          {isLoading
            ? formatMessage({ id: 'app.saving', defaultMessage: 'Saving...' })
            : formatMessage({ id: 'app.add', defaultMessage: 'Add' })}
        </button>
      </div>
      {errors && <Alert type={ALERT_TYPE.DANGER} text={errors} />}
      {success && <Alert type={ALERT_TYPE.SUCCESS} text={success} />}
    </form>
  )
}

export default AddCategory
