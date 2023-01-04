import { useState } from 'react'
import LabelInput from '../labelInput/LabelInput'
import Modal from '../modal/Modal'

export type Category = {
  _id: string
  name: string
}

interface IAddCategory {
  handleSaveCategory: (data: Category) => void
  handleClose: () => void
  isOpen: boolean
}

const AddCategory = ({ handleClose, handleSaveCategory, isOpen }: IAddCategory) => {
  const [category, setCategory] = useState<Category>({
    _id: '',
    name: '',
  })

  const isVisibleSendButton = !!category.name.length

  const createCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Modal
      title='Add category'
      handleClose={handleClose}
      btnName='Save'
      handleBtnEvent={() => handleSaveCategory(category)}
      isDisabledBtn={!isVisibleSendButton}
      isOpen={isOpen}
    >
      <div className='mb-3'>
        <LabelInput
          labelText='Category'
          id='name'
          onChange={createCategory}
          type='text'
          placeholder='Category name'
          isLabelVisible={false}
        />
      </div>
    </Modal>
  )
}

export default AddCategory
