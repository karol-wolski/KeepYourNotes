import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 ${styles.notFound}`}>
      <div className='row w-50'>
        <span className='fs-1 text-white mb-2'>Page not found</span>
        <Link to='/' className={`link ${styles.notFound__link}`}>
          Go to your notes
        </Link>
      </div>
    </div>
  )
}

export default NotFound
