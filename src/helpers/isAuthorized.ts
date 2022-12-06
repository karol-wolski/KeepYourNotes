import { getFromLocalStorage } from './localStorage'

export const isAuthorized = () => !!getFromLocalStorage('token')
