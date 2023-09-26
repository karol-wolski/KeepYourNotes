import { Link } from 'react-router-dom'

interface Props {
  title: string
  desc: string
  btnOnePath?: string
  btnOneText?: string
  btnTwoPath?: string
  btnTwoText?: string
}

const WelcomeSection = ({ title, desc, btnOnePath, btnOneText, btnTwoPath, btnTwoText }: Props) => {
  return (
    <section className='homepage-welcome vh-100 d-flex align-items-sm-center'>
      <div className='d-flex flex-column align-items-center mx-4' style={{ gap: '1.5rem' }}>
        <h1>{title}</h1>
        <span className='d-block'>{desc}</span>
        <div className='d-flex' style={{ gap: '1.5rem' }}>
          {btnOneText && btnOnePath && (
            <Link className='btn btn-primary btn-welcome' to={btnOnePath}>
              {btnOneText}
            </Link>
          )}
          {btnTwoText && btnTwoPath && (
            <Link className='btn btn-primary btn-welcome' to={btnTwoPath}>
              {btnTwoText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
