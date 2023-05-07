import EditUserPasswordForm, { INewPassword } from '../../components/editUserPasswordFrom/EditUserPasswordForm'
import { settingsLinksArray } from '../../constants/settingLinksArray'
import useFetch from '../../hooks/useFetch'
import LayoutSettings from '../../layout/LayoutSettings/LayoutSettings'

interface IResponse {
  password: string
}

const EditUserPage = () => {
  const { errors, successMsg, clearSuccessMsg, isLoading, fetchData, statusCode } = useFetch<IResponse>()

  const onSubmit = (newPasswordData: INewPassword) => {
    fetchData('user/passwordMe', 'PATCH', newPasswordData)
  }

  return (
    <LayoutSettings linksArray={settingsLinksArray}>
      <EditUserPasswordForm
        onSubmit={onSubmit}
        errors={errors}
        isLoading={isLoading}
        clearSuccessMsg={clearSuccessMsg}
        statusCode={statusCode}
        successMsg={successMsg}
      />
    </LayoutSettings>
  )
}

export default EditUserPage
