import EditUserAccount from '../../components/ediutUserAccountForm/EditUserAccountForm'
import { settingsLinksArray } from '../../constants/settingLinksArray'
import useFetch from '../../hooks/useFetch'
import useUsers from '../../hooks/useUsers'
import LayoutSettings from '../../layout/LayoutSettings/LayoutSettings'

interface IResponse {
  message: string
  data: IUser
}

export interface IUser {
  username: string
  email: string
}

const EditUserPage = () => {
  const getUser = useUsers()
  const { successMsg, clearSuccessMsg, errors, isLoading, fetchData, statusCode } = useFetch<IResponse>()

  const onSubmit = (updatedUser: IUser) => {
    fetchData('user/me', 'PATCH', updatedUser)
  }

  return (
    <LayoutSettings linksArray={settingsLinksArray}>
      {getUser && (
        <EditUserAccount
          userData={getUser}
          onSubmit={onSubmit}
          errors={errors}
          isLoading={isLoading}
          clearSuccessMsg={clearSuccessMsg}
          statusCode={statusCode}
          successMsg={successMsg}
        />
      )}
    </LayoutSettings>
  )
}

export default EditUserPage
