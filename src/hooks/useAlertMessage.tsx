import { useState } from 'react'
import { ALERT_TYPE } from '../components/alert/Alert'

interface Message {
  type: ALERT_TYPE
  translateId: string
  msg: string
}
const useAlertMessage = () => {
  const [messaage, setMessage] = useState<Message | undefined>()

  const set = (obj: Message | undefined) => setMessage(obj)

  return { messaage, set }
}

export default useAlertMessage
