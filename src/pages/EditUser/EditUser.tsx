import EditUserAccount from '../../components/ediutUserAccountForm/EditUserAccountForm'
import { settingsLinksArray } from '../../constants/settingLinksArray'
import { asyncFetch } from '../../helpers/asyncFetch'
import useUsers, { IUser } from '../../hooks/useUsers'
import LayoutSettings from '../../layout/LayoutSettings/LayoutSettings'

const EditUserPage = () => {
  const getUser = useUsers()

  const sendData = (user: IUser, cb: (status: number, message: string) => void) => {
    asyncFetch('user/me', 'PATCH', user).then(({ status, message }) => {
      cb(status, message)
    })
  }

  return (
    <LayoutSettings linksArray={settingsLinksArray}>
      {getUser && <EditUserAccount userData={getUser} sendData={sendData} />}
    </LayoutSettings>
  )
}

export default EditUserPage
