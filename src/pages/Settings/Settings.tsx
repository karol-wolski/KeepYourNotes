import { useIntl } from 'react-intl'
import { LANGUAGE_ARRAY } from '../../constants/languagesArray'
import { settingsLinksArray } from '../../constants/settingLinksArray'
import LayoutSettings from '../../layout/LayoutSettings/LayoutSettings'
import { THEME_ARRAY } from '../../constants/themeArray'

interface ISettingPage {
  changeAppSetting: (value: string, option: 'theme' | 'language') => void
}

const Settings = ({ changeAppSetting }: ISettingPage) => {
  const updateLanguageOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('lang', event.target.value)
    changeAppSetting(event.target.value, 'language')
  }

  const updateThemeOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('theme', event.target.value)
    changeAppSetting(event.target.value, 'theme')
  }

  const currentLang = localStorage.getItem('lang')
  const currentTheme = localStorage.getItem('theme')
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

      <label htmlFor='themes' className='mb-2'>
        {formatMessage({ id: 'app.theme', defaultMessage: 'Theme' })}
      </label>
      <select
        className='form-select'
        aria-label={formatMessage({
          id: 'app.selectUITheme',
          defaultMessage: 'Select the theme of the app',
        })}
        onChange={updateThemeOnChange}
        defaultValue={currentTheme || 'dark'}
        name='themes'
        id='themes'
      >
        {THEME_ARRAY.map(option => (
          <option key={option.id} value={option.value}>
            {formatMessage({ id: option.translateId, defaultMessage: option.name })}
          </option>
        ))}
      </select>
    </LayoutSettings>
  )
}

export default Settings
