import styles from './LoaderPage.module.scss'

interface ILoaderPage {
  isDark?: boolean
}

const LoaderPage = ({ isDark = true }: ILoaderPage) => {
  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 ${isDark && styles.loaderPage}`}>
      <div className='spinner-border text-light' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}

export default LoaderPage
