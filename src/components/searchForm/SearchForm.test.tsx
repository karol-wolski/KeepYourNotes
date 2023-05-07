import { IntlProvider } from 'react-intl'
import { AuthContext } from '../../context/AuthContext'
import localeEn from '../../lang/en.json'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchForm from './SearchForm'

let form: RenderResult

describe('Search Form', () => {
  const mockFn = jest.fn()

  beforeEach(() => {
    form = render(
      <IntlProvider messages={localeEn} locale='en' defaultLocale='en'>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: jest.fn() }}>
          <SearchForm searchByTitle={mockFn} />
        </AuthContext.Provider>
        ,
      </IntlProvider>,
    )
  })

  test('render form properly', () => {
    expect(form.getByLabelText(/Search the note/i)).toBeInTheDocument()
    expect(form.getByRole('textbox', { name: /Search the note/i })).toBeInTheDocument()
    expect(form.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  test('should send data', () => {
    const search = form.getByLabelText(/Search the note/i)
    fireEvent.change(search, { target: { value: 'test' } })

    const btn = form.getByRole('button', { name: /search/i })
    userEvent.click(btn)

    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toBeCalledWith('test')
  })
})
