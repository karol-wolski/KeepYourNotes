import { getFromLocalStorage } from './localStorage'

export const request = async (url: string, method: string, payload?: object) => {
  const getRequest = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${getFromLocalStorage('token')}`,
    }
    switch (method) {
      case 'GET':
        return { method, headers }

      case 'DELETE':
        return { method, headers }

      case 'POST':
        return { method, headers, body: JSON.stringify(payload) }

      case 'PATCH':
        return { method, headers, body: JSON.stringify(payload) }

      default:
        return { method, headers }
    }
  }

  const response = await fetch(url, getRequest())
  return response
}
