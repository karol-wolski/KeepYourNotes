import { request } from './request'

export const asyncFetch = async (path: string, method = 'GET', payload: object = {}) => {
  try {
    const response = await request(`${process.env.REACT_APP_API_URL}/${path}`, method, payload)
    const json = await response.json()
    return json
  } catch (err) {
    console.log(err)
  }
}
