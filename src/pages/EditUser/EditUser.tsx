import EditUserAccount from '../../components/ediutUserAccountForm/EditUserAccountForm'
import { settingsLinksArray } from '../../constants/settingLinksArray'
import useUsers from '../../hooks/useUsers'
import LayoutSettings from '../../layout/LayoutSettings/LayoutSettings'

const EditUserPage = () => {
  const getUser = useUsers()

  return (
    <LayoutSettings linksArray={settingsLinksArray}>{getUser && <EditUserAccount userData={getUser} />}</LayoutSettings>
  )
}

export default EditUserPage
