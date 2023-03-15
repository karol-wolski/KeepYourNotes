import { useIntl } from 'react-intl'
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
  const { formatMessage } = useIntl()

  return (
    <LayoutSettings linksArray={settingsLinksArray}>
      <label htmlFor='languages' className='mb-2'>
        {formatMessage({ id: 'app.language', defaultMessage: 'Language' })}
      </label>
      <select
        className='form-select'
        aria-label={formatMessage({
          id: 'app.selectUILangauge',
          defaultMessage: 'Select the language of the user interface',
        })}
        onChange={updateLanguageOnChange}
        defaultValue={currentLang || 'en'}
        name='languages'
        id='languages'
      >
        {LANGUAGE_ARRAY.map(option => (
          <option key={option.id} value={option.value}>
            {formatMessage({ id: option.translateId, defaultMessage: option.name })}
          </option>
        ))}
      </select>
    </LayoutSettings>
  )
}

export default Settings
