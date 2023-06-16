import { useState, useEffect, useContext } from 'react'
import { asyncFetch } from '../helpers/asyncFetch'
import { removeFromLocalStorage } from '../helpers/localStorage'
import { redirect } from 'react-router-dom'
import { AuthContext, IAuthContext } from '../context/AuthContext'

export interface IUser {
  email: string
  username: string
}

const useUser = () => {
  const { setIsLoggedIn } = useContext(AuthContext) as IAuthContext
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    asyncFetch('user/me', 'GET').then(response => {
      if (response.data) {
        setUser(response.data)
      }

      if (response.message === 'Unauthorized') {
        removeFromLocalStorage('token')
        setIsLoggedIn(false)
        return redirect('/login')
      }
    })
  }, [])

  return user
}

export default useUser
