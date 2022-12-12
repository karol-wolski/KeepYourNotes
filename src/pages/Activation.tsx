import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { asyncFetch } from '../helpers/asyncFetch'

const ActivationPage = () => {
  const [search] = useSearchParams()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const token = search.get('activeIt')
    if (token) {
      asyncFetch('auth/activate-account', 'PATCH', { activateToken: token }).then(response => {
        console.log(response)
        if (response.isActive) {
          setIsActive(response.isActive)
        } else {
          console.log(response)
        }
      })
    }
  }, [search])

  return isActive ? (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='row w-50'>
        <p className='pt-4 text-center'>Your account has been successfully activated.</p>
        <p className='pt-4 text-center'>
          Go to <Link to='/login'>Login page</Link>
        </p>
      </div>
    </div>
  ) : (
    <p>Loading ...</p>
  )
}

export default ActivationPage
