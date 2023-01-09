import EditUserPasswordForm, { INewPassword } from '../../components/editUserPasswordFrom/EditUserPasswordForm'
import { settingsLinksArray } from '../../constants/settingLinksArray'
import { asyncFetch } from '../../helpers/asyncFetch'
import LayoutSettings from '../../layout/LayoutSettings/LayoutSettings'

const EditUserPage = () => {
  const sendData = (password: INewPassword, cb: (status: number, message: string) => void) => {
    asyncFetch('user/passwordMe', 'PATCH', password).then(({ status, message }) => {
      cb(status, message)
    })
  }

  return (
    <LayoutSettings linksArray={settingsLinksArray}>
      <EditUserPasswordForm sendData={sendData} />
    </LayoutSettings>
  )
}

export default EditUserPage
