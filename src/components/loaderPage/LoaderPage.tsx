import styles from './LoaderPage.module.scss'

interface ILoaderPage {
  isDark?: boolean
}

const LoaderPage = ({ isDark = true }: ILoaderPage) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center position-absolute top-0 left-0 vh-100 w-100 ${
        isDark && styles.loaderPage
      }`}
    >
      <div className='spinner-border text-light' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}

export default LoaderPage
