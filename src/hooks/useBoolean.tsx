import { useCallback, useState } from 'react'

interface IUseBooleanActions {
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

const useBoolean = (initialValue = false): [boolean, IUseBooleanActions] => {
  const [value, setValue] = useState<boolean>(initialValue)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue(prevState => !prevState), [])

  return [value, { setTrue, setFalse, toggle }]
}

export default useBoolean
