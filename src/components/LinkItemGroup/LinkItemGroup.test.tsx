import { IntlProvider } from 'react-intl'
import { AuthContext } from '../../context/AuthContext'
import { render, RenderResult } from '@testing-library/react'
import localeEn from '../../lang/en.json'
import LinkItemGroup from './LinkItemGroup'
import { linkArray } from '../../constants/settingLinksArray'
import { MemoryRouter } from 'react-router-dom'

let itemsGroup: RenderResult

const linksArray: linkArray = [
  {
    id: 1,
    path: '/profile/app',
    name: 'Application Settings',
    translateId: 'app.appSettings',
  },
  {
    id: 2,
    path: '/profile/edit',
    name: 'Profile',
    translateId: 'app.profile',
  },
]

describe('Link Item Group', () => {
  beforeEach(() => {
    itemsGroup = render(
      <IntlProvider messages={localeEn} locale='en' defaultLocale='en'>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: jest.fn() }}>
          <MemoryRouter initialEntries={[{ pathname: '/profile/app' }]}>
            <LinkItemGroup linkArray={linksArray} />
          </MemoryRouter>
        </AuthContext.Provider>
        ,
      </IntlProvider>,
    )
  })

  test('should be render properly', () => {
    const item = itemsGroup.getByRole('link', { name: /application settings/i })
    expect(item).toBeInTheDocument()
    expect(item).toHaveAttribute('href', '/profile/app')
    const itemOne = itemsGroup.getByText(/profile/i)
    expect(itemOne).toBeInTheDocument()
    expect(itemOne).toHaveAttribute('href', '/profile/edit')
  })

  test('should have active class for active page link', () => {
    const item = itemsGroup.getByRole('link', { name: /application settings/i })
    expect(item.classList.contains('btn__secondary')).toBe(true)
  })

  test('should not have active class for non-active page link', () => {
    const item = itemsGroup.getByRole('link', { name: /profile/i })
    expect(item.classList.contains('btn__secondary')).toBe(false)
  })
})
