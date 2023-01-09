import { useState } from 'react'

type useObjectType<T> = [T, (obj: T) => void, () => void]

const useObject = <T,>(initialState: T): useObjectType<T> => {
  const [data, setData] = useState<T>(initialState)

  const update = (obj: T) =>
    setData(prevState => ({
      ...prevState,
      ...obj,
    }))

  const clear = () => setData(initialState)

  return [data, update, clear]
}

export default useObject
