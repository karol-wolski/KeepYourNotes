import { ReactNode } from 'react'
import styles from './LayoutForm.module.scss'

interface ILayoutForm {
  children: ReactNode
  title: string
}
const LayoutForm = ({ children, title }: ILayoutForm) => {
  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 ${styles['layout-form']}`}>
      <div className='container d-flex justify-content-center align-items-center'>
        <div className={`row p-3 ${styles['layout-form__wrapper']}`}>
          <h2 className='text-center'>{title}</h2>
          {children}
        </div>
      </div>
    </div>
  )
}

export default LayoutForm
