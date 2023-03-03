import { LANGUAGE_ARRAY } from '../../constants/languagesArray'
import { settingsLinksArray } from '../../constants/settingLinksArray'
import LayoutSettings from '../../layout/LayoutSettings/LayoutSettings'

interface ISettingPage {
  changeLanguage: (language: string) => void
}

const Settings = ({ changeLanguage }: ISettingPage) => {
  const updateLanguageOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('lang', event.target.value)
    changeLanguage(event.target.value)
  }

  const currentLang = localStorage.getItem('lang')

  return (
    <LayoutSettings linksArray={settingsLinksArray}>
      <label htmlFor='languages' className='mb-2'>
        Language
      </label>
      <select
        className='form-select'
        aria-label='Select the language of the user interface'
        onChange={updateLanguageOnChange}
        defaultValue={currentLang || 'en'}
        name='languages'
        id='languages'
      >
        {LANGUAGE_ARRAY.map(option => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </LayoutSettings>
  )
}

export default Settings
