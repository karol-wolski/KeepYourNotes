import styles from './Alert.module.scss'

export enum ALERT_TYPE {
  DANGER = 'alert-danger',
  SUCCESS = 'alert-success',
  WARNING = 'alert-warning',
  INFO = 'alert-info',
}

interface IAlert {
  type: ALERT_TYPE
  text: string
}

const Alert = ({ type, text }: IAlert) => {
  return (
    <div className={`alert ${type} py-2 my-2 ${styles.alert}`} role='alert'>
      {text}
    </div>
  )
}

export default Alert
