import EditUserPasswordForm from '../../components/editUserPasswordFrom/EditUserPasswordForm'
import { settingsLinksArray } from '../../constants/settingLinksArray'
import LayoutSettings from '../../layout/LayoutSettings/LayoutSettings'

const EditUserPage = () => {
  return (
    <LayoutSettings linksArray={settingsLinksArray}>
      <EditUserPasswordForm />
    </LayoutSettings>
  )
}

export default EditUserPage
