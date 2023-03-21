import { useCallback, useState } from 'react'
import { request } from '../helpers/request'
import useBoolean from './useBoolean'

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'POST_FORM_DATA'
type Payload = object | FormData

const useFetch = <T,>() => {
  const [data, setData] = useState<T>()
  const [successMsg, setSuccessMsg] = useState<string>('')
  const [errors, setErrors] = useState<string>('')
  const [statusCode, setStatusCode] = useState<number | undefined>()
  const [isLoading, { setTrue: setIsLoading, setFalse: setIsNotLoading }] = useBoolean(false)
  const [refetch, setRefetch] = useState({})
  const refresh = () => setRefetch({})
  const clearSuccessMsg = () => setSuccessMsg('')
  const fetchData = useCallback(
    async (path: string, method: Method, payload?: Payload) => {
      try {
        setIsLoading()
        setStatusCode(undefined)
        const response = await request(`${process.env.REACT_APP_API_URL}/${path}`, method, payload)
        const { data, message } = await response.json()
        setStatusCode(response.status)
        if (response.status === 200 || response.status === 201) {
          setData(data)
          setSuccessMsg(message)
        } else {
          setErrors(message)
        }
      } catch (err: unknown) {
        throw new Error('Something went wrong.')
      } finally {
        setIsNotLoading()
      }
    },
    [refetch],
  )
  return { data, successMsg, clearSuccessMsg, errors, statusCode, isLoading, refresh, fetchData }
}

export default useFetch
