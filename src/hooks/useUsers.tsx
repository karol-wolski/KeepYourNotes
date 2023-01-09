import { useState, useEffect } from 'react'
import { asyncFetch } from '../helpers/asyncFetch'

export interface IUser {
  email: string
  username: string
}

const useUser = () => {
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    asyncFetch('user/me', 'GET').then(response => {
      if (response.data) {
        setUser(response.data)
      }
    })
  }, [])

  return user
}

export default useUser
