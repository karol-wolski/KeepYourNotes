import { createContext } from 'react'

export type IAuthContext = {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<IAuthContext | null>(null)
