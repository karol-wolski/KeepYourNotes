import { useEffect, useRef, useState } from 'react'
import Alert, { ALERT_TYPE } from '../alert/Alert'
import LabelInput from '../labelInput/LabelInput'
import stylesBtn from '../../styles/buttons.module.scss'
import { checkCategoryExist } from '../../helpers/checkCategoryExist'
import { useIntl } from 'react-intl'
import useAlertMessage from '../../hooks/useAlertMessage'

export interface INewCategory {
  name: string
}

export interface ICategory extends INewCategory {
  _id: string
}

interface IAddCategory {
  onSubmit: (categoryName: string) => void
  categories: ICategory[]
  statusCode?: number
  isLoading?: boolean
}

const AddCategory = ({ onSubmit, categories, statusCode, isLoading }: IAddCategory) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const { formatMessage } = useIntl()
  const { messaage, set: setMessage } = useAlertMessage()

  const setBtnDisabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsButtonDisabled(!!event.target.value.length)
  }

  const saveCategory = () => {
    const category = {
      name: inputRef.current?.value || '',
    }
    if (checkCategoryExist(categories, category)) {
      setMessage({
        type: ALERT_TYPE.DANGER,
        translateId: 'app.categoryExist',
        msg: 'The category name exists.',
      })
    } else {
      onSubmit(category.name)
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
        setMessage({
          type: ALERT_TYPE.SUCCESS,
          translateId: 'app.categoryAdded',
          msg: 'Your category has been successfully added.',
        })
        const timeout = setTimeout(() => {
          setMessage(undefined)
        }, 3000)
        return () => clearTimeout(timeout)
      }
    }
    updateAndClear()
  }, [statusCode])

  return (
    <form className='mb-2' onSubmit={handleOnClick}>
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
        <button type='submit' className={`btn btn-primary ${stylesBtn.btn__primary}`} disabled={!isButtonDisabled}>
          {isLoading
            ? formatMessage({ id: 'app.saving', defaultMessage: 'Saving...' })
            : formatMessage({ id: 'app.add', defaultMessage: 'Add' })}
        </button>
      </div>
      {messaage && (
        <Alert type={messaage.type} text={formatMessage({ id: messaage.translateId, defaultMessage: messaage.msg })} />
      )}
    </form>
  )
}

export default AddCategory
